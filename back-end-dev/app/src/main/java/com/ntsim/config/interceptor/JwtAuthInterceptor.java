package com.ntsim.config.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ntsim.jwt.jwtToken;
import com.ntsim.redis.Redis;

public class JwtAuthInterceptor implements HandlerInterceptor{

	@Autowired
	private Redis redis;
	
	@Autowired
	private jwtToken jwttoken;
	
	private String HEADER_TOKEN_KEY = "Authorization";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		
		String givenToken = request.getHeader(HEADER_TOKEN_KEY);
		if(jwttoken.validateToken(givenToken)) {
			return true;
		} else {
			return false;
		}
	}
	
}
