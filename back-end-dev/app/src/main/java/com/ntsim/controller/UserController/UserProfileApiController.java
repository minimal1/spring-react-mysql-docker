package com.ntsim.controller.UserController;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.UserProfileApiRequest;
import com.ntsim.model.network.response.UserProfileApiResponse;
import com.ntsim.service.UserService.UserProfileApiService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class UserProfileApiController {

	@Autowired
	private UserProfileApiService userProfileApiService;
	
	@PostMapping("changePassword")
	public Header<UserProfileApiResponse> modifiProfile(HttpServletRequest request, @RequestBody Header<UserProfileApiRequest> userApiRequest){
		
		String accessToken = request.getHeader("authorization");
		
		return userProfileApiService.modifiProfile(accessToken, userApiRequest);
	}
	
}
