package com.ntsim.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ntsim.config.interceptor.JwtAuthInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Bean
    JwtAuthInterceptor jwtAuthInterceptor() {
         return new JwtAuthInterceptor();
    }

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// TODO Auto-generated method stub
		registry.addInterceptor(jwtAuthInterceptor()).addPathPatterns("/user/me").excludePathPatterns("/register");
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		registry.addMapping("/**").allowedMethods("GET","POST");
	}

}
