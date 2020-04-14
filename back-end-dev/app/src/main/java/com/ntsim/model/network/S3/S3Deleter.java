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
import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperDeleteRequest;
import com.ntsim.model.network.response.S3UploaderResponse;
import com.ntsim.repository.PaperRepository;
import com.ntsim.service.PaperApiLogicService;
import com.ntsim.service.PaperDeleteApiService;
import com.ntsim.textrank.Summarizer;
import com.ntsim.textrank.TextRank;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Deleter {
	private final AmazonS3Client amazonS3Client;

	@Autowired
	private PaperDeleteApiService paperDeleteApiService;
	
	@Autowired
	private PaperRepository paperRepository;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	
	public Header delete_file(Header<PaperDeleteRequest> paperDeleteRequest) {
		// Delete from AWS S3
		PaperDeleteRequest request = paperDeleteRequest.getData();
		Optional<Paper> paperCheck = paperRepository.findById(request.getPaperId());
		System.out.println("S3 Delete");
		paperCheck.ifPresent(paper -> {
			amazonS3Client.deleteObject(bucket, paper.getKeyName());
			amazonS3Client.deleteObject(bucket, "graduThumbNail/" + paper.getKeyName().split("/")[1] + ".png");
		});
		return paperDeleteApiService.deleteMyPaper(paperDeleteRequest);
	}
}
