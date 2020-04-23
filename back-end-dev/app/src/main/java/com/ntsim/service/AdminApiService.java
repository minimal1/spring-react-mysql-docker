package com.ntsim.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.User;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.AdminPWsetRequest;
import com.ntsim.model.network.response.UserListApiResponse;
import com.ntsim.model.security.UserSha256;
import com.ntsim.repository.UserRepository;

@Service

public class AdminApiService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserSha256 userSha256;

	public Header<UserListApiResponse> getAllUser() {

		List<User> userList = userRepository.findAll();

		UserListApiResponse userListApiResponse = UserListApiResponse.builder().userList(userList).build();

		return Header.OK(userListApiResponse);
	}

	public Header setPassword(Header<AdminPWsetRequest> pwSetRequest) {

		AdminPWsetRequest rRequest = pwSetRequest.getData();

		String studentNumber = rRequest.getStudentNumber();
		String newPW = rRequest.getNewPassword();

		Optional<User> userCheck = userRepository.findById(studentNumber);

		return userCheck.map(user -> {
			String encoded = userSha256.encrypt(newPW);
			user.setUserPassword(encoded);

			return user;
		}).map(user -> userRepository.save(user)).map(user -> Header.OK()).orElseGet(() -> Header.ERROR("해당 아이디 없음"));
	}
}
