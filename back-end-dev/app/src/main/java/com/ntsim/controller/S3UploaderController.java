package com.ntsim.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ntsim.model.network.S3.S3Uploader;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class S3UploaderController {
	private final S3Uploader s3Uploader;

    @GetMapping("j")
    public String index() {
        return "home";
    }

    @PostMapping("/upload")
    @ResponseBody
    public String upload(@RequestParam("data") MultipartFile multipartFile) throws IOException {
        return s3Uploader.upload(multipartFile, "graduPdf");
    }
}
