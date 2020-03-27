package com.ntsim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperEditDoneRequest;
import com.ntsim.model.network.response.PaperEditResponse;
import com.ntsim.service.PaperEditApiService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class PaperEditController {

	@Autowired
	private PaperEditApiService paperEditApiService;
	
	@GetMapping("/editPaper/{id}")
	public Header<PaperEditResponse> editPaper(@PathVariable("id") Long id){
		return paperEditApiService.editPapaer(id);
	}
	
	@PostMapping("/editPaperDone/{id}")
	public Header editPaperDone(@PathVariable("id") Long id, @RequestBody Header<PaperEditDoneRequest> paperEditDoneRequest) {
		return paperEditApiService.editPaperDone(id, paperEditDoneRequest);
	}
	
}
