package com.ntsim.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.jwt.jwtToken;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperDetailRequest;
import com.ntsim.model.network.request.PaperLikeRequest;
import com.ntsim.model.network.response.PaperDetailResponse;
import com.ntsim.service.PaperDetailService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class PaperDetailController {

	@Autowired
	private PaperDetailService paperDetailService;
	
	@Autowired
	private jwtToken jwtToken;
	
	@PostMapping("/getPaperDetail")
	public Header<PaperDetailResponse> getDetail(HttpServletRequest request, @RequestBody Header<PaperDetailRequest> paperDetailRequest){
		
		String accessToken = request.getHeader("authorization");
    	String studentNumber = jwtToken.getUserUID(accessToken);
		
		return paperDetailService.getDetail(studentNumber, paperDetailRequest);
	}
}
