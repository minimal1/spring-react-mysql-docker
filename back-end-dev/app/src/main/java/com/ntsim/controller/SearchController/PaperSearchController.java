package com.ntsim.controller.SearchController;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.jwt.jwtToken;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperSearchRequest;
import com.ntsim.model.network.response.PaperSearchResponse;
import com.ntsim.service.SearchService.PaperSearchService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class PaperSearchController {

	@Autowired
	private PaperSearchService paperSearchService;
	
	@Autowired
	private jwtToken jwtToken;
	
	@PostMapping("/searchPaper")
	public Header<PaperSearchResponse> searchPaper(HttpServletRequest request, @RequestBody Header<PaperSearchRequest> rRequest){
		
		String accessedToken = request.getHeader("authorization");
    	String studentNumber = jwtToken.getUserUID(accessedToken);
    	
		return paperSearchService.searchPaper(studentNumber, rRequest);
	}
}
