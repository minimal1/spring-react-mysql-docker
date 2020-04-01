package com.ntsim.model.network.S3;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.S3UploaderResponse;
import com.ntsim.service.PaperApiLogicService;
import com.ntsim.textrank.Summarizer;
import com.ntsim.textrank.TextRank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {
	private final AmazonS3Client amazonS3Client;

	@Autowired
	private PaperApiLogicService paperApiLogicService;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public Header<S3UploaderResponse> upload_file(MultipartFile multipartFile, String year, String category,
			String professor, String github, String studentNumber, String dirName) throws IOException {
		log.info("upload_file start");
		log.info("Backend : " + year);
		log.info("Backend : " + category);
		log.info("Backend : " + professor);
		log.info("Backend : " + github);
		File uploadFile = convert(multipartFile)
				.orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

		log.info("TextRank Started");
		String fileName = dirName + "/" + uploadFile.getName();
		String uploadImageUrl = putS3(uploadFile, fileName);

		String uploadThumbNail = saveThumbNail(uploadFile, "graduThumbNail/" + uploadFile.getName()+".png");

		// TextRank 실시.
		TextRank tr = new TextRank();
		String text = tr.getText(uploadFile);
		Summarizer summarizer = new Summarizer(text);
		List<String> summary = summarizer.summarize();
		for (String sentence : summary)
			log.info(sentence);
		removeNewFile(uploadFile);
		return paperApiLogicService.upload(fileName, year, category, professor, github, summary.get(0), summary.get(1),
				summary.get(2), studentNumber, uploadThumbNail, summary.get(3));
	}

	private String saveThumbNail(File file, String fileName) {
		String resultUrl = "";
		try (final PDDocument document = PDDocument.load(file)) {
			PDFRenderer pdfRenderer = new PDFRenderer(document);

			BufferedImage p1Image = pdfRenderer.renderImageWithDPI(0, 300);
			BufferedImage p2Image = pdfRenderer.renderImageWithDPI(1, 300);
			BufferedImage joinedImage = joinBufferedImage(p1Image, p2Image);
			
			File outputfile = new File("tempImage.png");
			ImageIO.write(joinedImage, "png", outputfile);
			resultUrl = putS3(outputfile, fileName);
			outputfile.delete();

		} catch (IOException e) {
			System.err.println("Exception while trying to create pdf document - " + e);
		}
		return resultUrl;
	}

	public static BufferedImage joinBufferedImage(BufferedImage img1,BufferedImage img2) {

        //do some calculate first
        int offset  = 5;
        int wid = img1.getWidth()+img2.getWidth()+offset;
        int height = Math.max(img1.getHeight(),img2.getHeight())+offset;
        //create a new buffer and draw two image into the new image
        BufferedImage newImage = new BufferedImage(wid,height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2 = newImage.createGraphics();
        Color oldColor = g2.getColor();
        //fill background
        g2.setPaint(Color.WHITE);
        g2.fillRect(0, 0, wid, height);
        //draw image
        g2.setColor(oldColor);
        g2.drawImage(img1, null, 0, 0);
        g2.drawImage(img2, null, img1.getWidth()+offset, 0);
        g2.dispose();
        return newImage;
    }
	
	private String putS3(File uploadFile, String fileName) {
		amazonS3Client.putObject(
				new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
		return amazonS3Client.getUrl(bucket, fileName).toString();
	}

	private void removeNewFile(File targetFile) {
		if (targetFile.delete()) {
			log.info("파일이 삭제되었습니다.");
		} else {
			log.info("파일이 삭제되지 못했습니다.");
		}
	}

	private Optional<File> convert(MultipartFile file) throws IOException {
		File convertFile = new File(file.getOriginalFilename());
		if (convertFile.createNewFile()) {
			try (FileOutputStream fos = new FileOutputStream(convertFile)) {
				fos.write(file.getBytes());
			}
			return Optional.of(convertFile);
		}

		return Optional.empty();
	}
}
