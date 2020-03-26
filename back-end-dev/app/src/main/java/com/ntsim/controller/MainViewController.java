package com.ntsim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.MainViewResponse;
import com.ntsim.repository.PaperRepository;
import com.ntsim.service.MainViewApiLogicService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class MainViewController {
	
	@Autowired
	private MainViewApiLogicService mainViewApiLogicService;
	
//	@GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
//	public String test() {
//		return "test!!";
//	}
	
	@GetMapping("/getAllPaper")
	public Header<MainViewResponse> getAllPaper(){
		return mainViewApiLogicService.getAll();
	}
}
