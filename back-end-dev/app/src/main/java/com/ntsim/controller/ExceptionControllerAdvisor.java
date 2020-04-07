package com.ntsim.controller;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class ExceptionControllerAdvisor {

	@ExceptionHandler(value = Exception.class)
	public void handleDemoExceptionForGlobal(Exception e) {
		if (e.getClass().getName().contains("SilentExitException")) {
			// Do nothing.
		} else {
			log.error(getPrintStackTrace(e));
		}
	}

	public static String getPrintStackTrace(Exception e) {
		StringWriter errors = new StringWriter();
		e.printStackTrace(new PrintWriter(errors));
		return errors.toString();
	}
}