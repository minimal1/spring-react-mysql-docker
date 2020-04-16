package com.ntsim.controller.SearchController;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntsim.jwt.jwtToken;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.TagsResponse;
import com.ntsim.service.SearchService.TagsApiService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class TagsController {
	
	@Autowired
	private TagsApiService tagsApiService;

	@Autowired
	private jwtToken jwtToken;
	
	@GetMapping("/tags/{division}/{filter}")
	public Header<TagsResponse> editPaper(HttpServletRequest request, @PathVariable("division") String division, @PathVariable("filter") String searchString){
		
		String accessedToken = request.getHeader("authorization");
    	String studentNumber = jwtToken.getUserUID(accessedToken);
    	
		return tagsApiService.filterPaper(studentNumber, division, searchString);
	}
}
