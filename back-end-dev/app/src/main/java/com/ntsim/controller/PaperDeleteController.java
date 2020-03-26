package com.ntsim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperDeleteRequest;
import com.ntsim.service.PaperDeleteApiService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class PaperDeleteController {

	@Autowired
	private PaperDeleteApiService paperDeleteApiService;
	
	@PostMapping("/deleteMyPaper")
	public Header deleteMyPaper(@RequestBody Header<PaperDeleteRequest> paperDeleteRequest){
		return paperDeleteApiService.deleteMyPaper(paperDeleteRequest);
	}
	
}
