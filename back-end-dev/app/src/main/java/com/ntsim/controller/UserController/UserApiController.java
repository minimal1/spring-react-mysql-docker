package com.ntsim.controller.UserController;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.UserApiRequest;
import com.ntsim.model.network.response.UserApiResponse;
import com.ntsim.service.UserService.UserApiLogicService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class UserApiController {
	
	@Autowired
	private UserApiLogicService userApiLogicService;

	@PostMapping("/register")
	public Header<UserApiResponse> create(@RequestBody Header<UserApiRequest> userApiRequest) {

		return userApiLogicService.create(userApiRequest);
	}
	
	@PostMapping("/login")
	public Header<UserApiResponse> login(@RequestBody Header<UserApiRequest> userApiRequest) {
		return userApiLogicService.login(userApiRequest);
	}
	
	@GetMapping("/user/me")
	public Header<UserApiResponse> validate(HttpServletRequest request){
		return userApiLogicService.validate(request);
	}
	
	
}
