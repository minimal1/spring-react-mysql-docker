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
import com.ntsim.model.network.request.PaperLikeRequest;
import com.ntsim.model.network.response.PaperLikeResponse;
import com.ntsim.service.PaperLikeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class PaperLikeController {

	@Autowired
	private jwtToken jwtToken;
	
	@Autowired
	private PaperLikeService paperLikeService;
	
	@PostMapping("/likePaper")
	public Header<PaperLikeResponse> likePaper(HttpServletRequest request,@RequestBody Header<PaperLikeRequest> paperLikeRequest){
		
		String accessToken = request.getHeader("authorization");
    	String studentNumber = jwtToken.getUserUID(accessToken);

		return paperLikeService.likePaper(studentNumber, paperLikeRequest);
	}
}
