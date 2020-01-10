package com.ntsim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.UserApiRequest;
import com.ntsim.model.network.response.UserApiResponse;
import com.ntsim.service.UserApiLogicService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class UserApiController {
	
	@Autowired
	private UserApiLogicService userApiLogicService;

	@PostMapping("/signup")
	public Header<UserApiResponse> create(@RequestBody Header<UserApiRequest> userApiRequest) {

		return userApiLogicService.create(userApiRequest);
	}
	
	@PostMapping("/login")
	public Header<UserApiResponse> login(@RequestBody Header<UserApiRequest> userApiRequest) {
		return userApiLogicService.login(userApiRequest);
	}
}
