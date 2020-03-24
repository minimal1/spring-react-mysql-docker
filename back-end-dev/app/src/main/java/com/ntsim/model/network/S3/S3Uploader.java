package com.ntsim.model.network.S3;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ntsim.model.entity.User;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.S3UploaderRequest;
import com.ntsim.model.network.request.UserApiRequest;
import com.ntsim.textrank.Summarizer;
import com.ntsim.textrank.TextRank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {
	private final AmazonS3Client amazonS3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	public String upload_file(MultipartFile multipartFile,String year, String category, String professor, String dirName) throws IOException {
		log.info("upload_file start");
		System.out.println("Backend : " + year);
		System.out.println("Backend : " + category);
		System.out.println("Backend : " + professor);
		File uploadFile = convert(multipartFile)
				.orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

		return upload(uploadFile, dirName);
	}
//	public String upload(@RequestBody Header<S3UploaderRequest> s3uploaderRequest) throws IOException {
//		S3UploaderRequest s3Request = s3uploaderRequest.getData();
//		String year = s3Request.getYear();
//		String category = s3Request.getCategory();
//		String professor = s3Request.getProfessor();
//		System.out.println("Backend : " + year);
//		System.out.println("Backend : " + category);
//		System.out.println("Backend : " + professor);
//
//		return "upload succes";
//	}

	public String upload(File uploadFile, String dirName) throws IOException {
		System.out.println("TextRank Started");
		String fileName = dirName + "/" + uploadFile.getName();
		String uploadImageUrl = putS3(uploadFile, fileName);
		// TextRank 실시.
		TextRank tr = new TextRank();
        String text = tr.getText(uploadFile);
        Summarizer summarizer = new Summarizer(text);
        for(String sentence : summarizer.summarize())
        	log.info(sentence);
		removeNewFile(uploadFile);
		return uploadImageUrl;
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
