package com.ntsim.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.S3.S3Uploader;
import com.ntsim.model.network.request.S3UploaderRequest;
import com.ntsim.model.network.request.UserApiRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Controller
public class S3UploaderController {
	private final S3Uploader s3Uploader;	//test

    @GetMapping("j")
    public String index() {
        return "home";
    }
    @PostMapping("/upload_file")
    @ResponseBody
    public String upload_file(@RequestParam("data") MultipartFile multipartfile,
    		@RequestParam("year") String year,
    		@RequestParam("category") String category,
    		@RequestParam("professor") String professor) throws IOException {
        return s3Uploader.upload_file(multipartfile, year, category, professor, "graduPdf");
    }
//    @PostMapping("/upload")
//    @ResponseBody
//    public String upload(@RequestBody Header<S3UploaderRequest> s3uploaderRequest) throws IOException {
//        return s3Uploader.upload(s3uploaderRequest);
//    }
}
