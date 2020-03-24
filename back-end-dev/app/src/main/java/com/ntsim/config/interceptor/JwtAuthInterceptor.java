package com.ntsim.config.interceptor;

import java.io.BufferedReader;
import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.ntsim.jwt.jwtToken;
import com.ntsim.redis.Redis;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthInterceptor implements HandlerInterceptor {

	@Autowired
	private jwtToken jwtToken;
	@Autowired
	public RedisTemplate<Serializable, Serializable> redisTemplate;

	private Logger logger = LoggerFactory.getLogger(JwtAuthInterceptor.class);
	private String HEADER_TOKEN_KEY = "authorization";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		String loginTokenVal = request.getHeader(HEADER_TOKEN_KEY);
		
		if (!request.getMethod().equals("OPTIONS")) {
			if (jwtToken.validateToken(loginTokenVal)) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}
