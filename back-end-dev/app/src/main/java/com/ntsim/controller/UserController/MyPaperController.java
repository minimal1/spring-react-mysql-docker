package com.ntsim.controller.UserController;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.jwt.jwtToken;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.MyPaperResponse;
import com.ntsim.service.UserService.MyPaperApiService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class MyPaperController {
	
	@Autowired
	private MyPaperApiService myPaperApiService;
	
	@Autowired
	private jwtToken jwtToken;
	
	@GetMapping("/getMyPaper")
	public Header<MyPaperResponse> getMyPaper(HttpServletRequest request){
		
		String accessToken = request.getHeader("authorization");
    	String studentNumber = jwtToken.getUserUID(accessToken);

		return myPaperApiService.getMyPaper(studentNumber);
	}
}
