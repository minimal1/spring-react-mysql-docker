package com.ntsim.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.jwt.jwtToken;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.MainViewResponse;
import com.ntsim.service.MainViewApiLogicService;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
@Slf4j
public class MainViewController {
	
	@Autowired
	private MainViewApiLogicService mainViewApiLogicService;
	
	@Autowired
	private jwtToken jwtToken;
	
	@GetMapping("/getAllPaper")
	public Header<MainViewResponse> getAllPaper(HttpServletRequest request){
		
		String accessedToken = request.getHeader("authorization");
    	String studentNumber = jwtToken.getUserUID(accessedToken);
		
		return mainViewApiLogicService.getAll(studentNumber);
	}
}
