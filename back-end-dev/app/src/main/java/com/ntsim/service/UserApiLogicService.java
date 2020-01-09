package com.ntsim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ntsim.model.entity.User;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.UserApiRequest;
import com.ntsim.model.network.response.UserApiResponse;
import com.ntsim.repository.UserRepository;

@Service
public class UserApiLogicService {

	@Autowired
	private UserRepository userRepository;
	
	public Header<UserApiResponse> create(@RequestBody Header<UserApiRequest> userApiRequest) {

		UserApiRequest uRequest = userApiRequest.getData();
		
		User user = User.builder()
				.studentNumber(uRequest.getId())
				.userPassword(uRequest.getPw())
				.userEmail(uRequest.getEmail())
				.build();
		
		User newUser = userRepository.save(user);
		
		return response(newUser);
	}
	
	private Header<UserApiResponse> response(User user) {
		
		UserApiResponse userApiResponse = UserApiResponse.builder()
				.studentNumber(user.getStudentNumber())
				.userEmail(user.getUserEmail())
				.userPassword(user.getUserPassword())
				.build();
		
		return Header.OK(userApiResponse);
				
	}
	
}
