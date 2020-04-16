package com.ntsim.model.network.S3;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.amazonaws.services.s3.AmazonS3Client;
import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperDeleteRequest;
import com.ntsim.repository.PaperRepository;
import com.ntsim.service.PaperService.PaperDeleteApiService;

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
