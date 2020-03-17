package com.ntsim.service;

import java.util.Optional;

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

	boolean pwCheck = false;
	String userEmail = "";
	
	@Autowired
	private UserRepository userRepository;

	public Header<UserApiResponse> create(@RequestBody Header<UserApiRequest> userApiRequest) {

		UserApiRequest uRequest = userApiRequest.getData();

		Optional<User> userCheck = userRepository.findById(uRequest.getId());

		if (userCheck.isPresent()) {
			return Header.ERROR("이미 존재하는 아이디 입니다.");
		}

		User user = User.builder().studentNumber(uRequest.getId()).userPassword(uRequest.getPw())
				.userEmail(uRequest.getEmail()).build();

		User newUser = userRepository.save(user);

		return response(newUser);
	}

	public Header<UserApiResponse> login(@RequestBody Header<UserApiRequest> userApiRequest) {
		
		UserApiRequest uRequest = userApiRequest.getData();

		Optional<User> userCheck = userRepository.findById(uRequest.getId());

		
		if(!userCheck.isPresent()) {
			return Header.ERROR("존재하지 않는 아이디 입니다.");
		}
		
		
		userCheck.ifPresent(user -> {
			pwCheck = false;
			userEmail = "";
			userEmail  = user.getUserEmail();
			String pw = user.getUserPassword();
			if(uRequest.getPw().equals(pw)) {
				pwCheck = true;
			}
		});
		
		if(pwCheck) {
			User user = User.builder().studentNumber(uRequest.getId()).userPassword(uRequest.getPw())
					.userEmail(userEmail).build();
			return response(user);
		} else {
			return Header.ERROR("비밀 번호가 일치하지 않습니다.");
		}
	}

	private Header<UserApiResponse> response(User user) {

		UserApiResponse userApiResponse = UserApiResponse.builder().studentNumber(user.getStudentNumber())
				.userEmail(user.getUserEmail()).userPassword(user.getUserPassword()).build();

		return Header.OK(userApiResponse);

	}

}
