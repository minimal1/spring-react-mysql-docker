package com.ntsim.service.UserService;

import java.io.Serializable;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ntsim.jwt.jwtToken;
import com.ntsim.model.entity.User;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.UserApiRequest;
import com.ntsim.model.network.response.UserApiResponse;
import com.ntsim.model.security.UserSha256;
import com.ntsim.redis.Redis;
import com.ntsim.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserApiLogicService {

	boolean pwCheck = false;
	String userEmail = "";
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private jwtToken jwtToken;
	
	@Autowired
	private RedisTemplate<Serializable, Serializable> redisTemplate;
	
	@Autowired
	private UserSha256 userSha256;
	
	private Logger logger = LoggerFactory.getLogger(UserApiLogicService.class);
	
	public Header<UserApiResponse> validate(HttpServletRequest request){
		
		String accessToken = request.getHeader("authorization");
		String userId = jwtToken.getUserUID(accessToken);
		String userEmail = jwtToken.getUserEmail(accessToken);
		
		User user = User.builder().studentNumber(userId).userEmail(userEmail).build();
		return response(user);
	}
	
	public Header<UserApiResponse> create(@RequestBody Header<UserApiRequest> userApiRequest) {

		UserApiRequest uRequest = userApiRequest.getData();

		Optional<User> userCheck = userRepository.findById(uRequest.getId());

		if (userCheck.isPresent()) {
			return Header.ERROR("이미 존재하는 아이디 입니다.");
		}

		String encoded = userSha256.encrypt(uRequest.getPw());
		
		User user = User.builder().studentNumber(uRequest.getId()).userPassword(encoded)
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
			
			String encoded = userSha256.encrypt(uRequest.getPw());

			if(encoded.equals(pw)) {
				pwCheck = true;
			}
		});
		
		if(pwCheck) {
			String encoded = userSha256.encrypt(uRequest.getPw());

			User user = User.builder().studentNumber(uRequest.getId()).userPassword(encoded)
					.userEmail(userEmail).build();
			String userToken = this.saveTokenInRedis(user);
			
			return response(user,userToken);
		} else {
			return Header.ERROR("비밀 번호가 일치하지 않습니다.");
		}
	}

	private Header<UserApiResponse> response(User user) {

		UserApiResponse userApiResponse = UserApiResponse.builder().studentNumber(user.getStudentNumber())
				.userEmail(user.getUserEmail()).userPassword(user.getUserPassword()).build();

		return Header.OK(userApiResponse);

	}
	
	private Header<UserApiResponse> response(User user, String token) {

		UserApiResponse userApiResponse = UserApiResponse.builder().studentNumber(user.getStudentNumber())
				.userEmail(user.getUserEmail()).userPassword(user.getUserPassword()).accessToken(token).build();

		return Header.OK(userApiResponse);

	}
	
	private String saveTokenInRedis(User user) {
		String userToken = jwtToken.getUserToken(user);
		Redis.set(user.getStudentNumber(), userToken, redisTemplate);

		return userToken;
	}

}
