package com.ntsim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.AdminPWsetRequest;
import com.ntsim.model.network.request.UserApiRequest;
import com.ntsim.model.network.response.UserListApiResponse;
import com.ntsim.service.AdminApiService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class AdminController {
	
	@Autowired
	private AdminApiService adminApiService;
	
	@GetMapping("/getAllUser")
	public Header<UserListApiResponse> getAllUser(){
		return adminApiService.getAllUser();
	}
	
	@PostMapping("/setPassword")
	public Header setPassword(@RequestBody Header<AdminPWsetRequest> pwSetRequest) {
		return adminApiService.setPassword(pwSetRequest);
	}
	
}
