package com.ntsim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.S3.S3Deleter;
import com.ntsim.model.network.S3.S3Uploader;
import com.ntsim.model.network.request.PaperDeleteRequest;
import com.ntsim.service.PaperDeleteApiService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("")
public class PaperDeleteController {

	private final S3Deleter s3Deleter;
	
	@PostMapping("/deleteMyPaper")
	public Header deleteMyPaper(@RequestBody Header<PaperDeleteRequest> paperDeleteRequest){
		return s3Deleter.delete_file(paperDeleteRequest);
	}
	
}
