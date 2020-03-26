package com.ntsim.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperDetailRequest;
import com.ntsim.model.network.response.PaperDetailResponse;
import com.ntsim.service.PaperDetailService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class PaperDetailController {

	@Autowired
	private PaperDetailService paperDetailService;
	
	@PostMapping("/getPaperDetail")
	public Header<PaperDetailResponse> getDetail(@RequestBody Header<PaperDetailRequest> paperDetailRequest){
		return paperDetailService.getDetail(paperDetailRequest);
	}
}
