package com.ntsim.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ntsim.jwt.jwtToken;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.S3.S3Uploader;
import com.ntsim.model.network.response.S3UploaderResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Controller
public class S3UploaderController {
	
	@Autowired
	private jwtToken jwtToken;
	
	private final S3Uploader s3Uploader;
    
    @PostMapping("/upload_file")
    @ResponseBody
    public Header<S3UploaderResponse> upload_file(@RequestParam("data") MultipartFile multipartfile,
    		@RequestParam("year") String year,
    		@RequestParam("category") String category,
    		@RequestParam("github") String github,
    		HttpServletRequest request) throws IOException {

    	String accessedToken = request.getHeader("authorization");
    	String studentNumber = jwtToken.getUserUID(accessedToken);
    	
    	
        return s3Uploader.upload_file(multipartfile, year, category, github, studentNumber, "graduPdf");
    }
}
