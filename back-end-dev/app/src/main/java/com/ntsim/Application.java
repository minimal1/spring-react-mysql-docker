package com.ntsim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Application {

	public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.properties,"
            + "classpath:aws.properties";
	
	public static void main(String[] args) {
		new SpringApplicationBuilder(Application.class)
        .properties(APPLICATION_LOCATIONS)
        .run(args);
	}
}
