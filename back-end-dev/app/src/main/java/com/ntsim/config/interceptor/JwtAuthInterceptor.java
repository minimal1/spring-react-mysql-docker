package com.ntsim.config.interceptor;

import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ntsim.jwt.jwtToken;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthInterceptor implements HandlerInterceptor {

	@Autowired
	private jwtToken jwtToken;
	@Autowired
	public RedisTemplate<Serializable, Serializable> redisTemplate;

	private String HEADER_TOKEN_KEY = "authorization";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		try {
			String loginTokenVal = request.getHeader(HEADER_TOKEN_KEY);
			if (!request.getMethod().equals("OPTIONS")) {
				if (jwtToken.validateToken(loginTokenVal)) {
					if (jwtToken.getExpToken(loginTokenVal)) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return true;
			}
		} catch (Exception e) {
			response.addHeader("LOGOUT", "LOGOUT");
		}
		return false;
	}
}
