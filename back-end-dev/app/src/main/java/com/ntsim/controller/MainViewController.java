package com.ntsim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.MainViewResponse;
import com.ntsim.service.MainViewApiLogicService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class MainViewController {
	
	@Autowired
	private MainViewApiLogicService mainViewApiLogicService;
	
	@GetMapping("/getAllPaper")
	public Header<MainViewResponse> getAllPaper(){
		return mainViewApiLogicService.getAll();
	}
}
