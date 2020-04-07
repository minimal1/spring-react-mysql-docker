package com.ntsim;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class Application {

	public static final String APPLICATION_LOCATIONS = "spring.config.location=" + "classpath:application.properties,"
			+ "classpath:aws.properties";

	public static void main(String[] args) {
		new SpringApplicationBuilder(Application.class).properties(APPLICATION_LOCATIONS).run(args);
		log.info("Aplicattion Started.");
	}

}
