package com.ntsim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperSearchRequest;
import com.ntsim.model.network.response.PaperSearchResponse;
import com.ntsim.service.PaperSearchService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class PaperSearchController {

	@Autowired
	private PaperSearchService paperSearchService;
	
	@PostMapping("/searchPaper")
	public Header<PaperSearchResponse> searchPaper(@RequestBody Header<PaperSearchRequest> request){
		return paperSearchService.searchPaper(request);
	}
}
