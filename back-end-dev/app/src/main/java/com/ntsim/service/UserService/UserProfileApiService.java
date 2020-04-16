package com.ntsim.service.UserService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.User;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.UserProfileApiRequest;
import com.ntsim.model.network.response.UserProfileApiResponse;
import com.ntsim.model.security.UserSha256;
import com.ntsim.repository.UserRepository;

@Service
public class UserProfileApiService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserSha256 userSha256;
	
	private boolean pwCheck = false;

	public Header<UserProfileApiResponse> modifiProfile(String accessToken,
			Header<UserProfileApiRequest> userApiRequest) {
		pwCheck = false;

		UserProfileApiRequest uRequest = userApiRequest.getData();

		Optional<User> userCheck = userRepository.findById(uRequest.getStudentNumber());

		// check old PW
		userCheck.ifPresent(user -> {
			String encoded = userSha256.encrypt(uRequest.getOldPassword());

			if (user.getUserPassword().equals(encoded)) {
				pwCheck = true;
			}
		});

		if (!pwCheck) {
			return Header.ERROR("Wrong Password");
		}

		return userCheck.map(user -> {
			user.setUserEmail(uRequest.getEmail());
			user.setStudentNumber(uRequest.getStudentNumber());
			String encoded = userSha256.encrypt(uRequest.getNewPassword());
			user.setUserPassword(encoded);
			
			return user;
		}).map(user -> userRepository.save(user)).map(user -> response(user)).orElseGet(() -> Header.ERROR("데이터 없음"));

	}

	private Header<UserProfileApiResponse> response(User user) {

		UserProfileApiResponse userApiResponse = UserProfileApiResponse.builder().studentNumber(user.getStudentNumber())
				.email(user.getUserEmail()).password(user.getUserPassword()).build();

		return Header.OK(userApiResponse);

	}

}
