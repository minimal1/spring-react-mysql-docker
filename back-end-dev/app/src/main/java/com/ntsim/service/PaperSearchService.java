package com.ntsim.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperSearchRequest;
import com.ntsim.model.network.response.PaperSearchResponse;
import com.ntsim.repository.PaperRepository;

@Service
public class PaperSearchService {

	@Autowired
	private PaperRepository paperRepository;
	
	public Header<PaperSearchResponse> searchPaper(Header<PaperSearchRequest> request) {

		PaperSearchRequest rRequest = request.getData();
		List<Paper> resultPaperList = getSearchPaperList(rRequest.getQuery());
		
		return response(resultPaperList);
	}
	
	private List<Paper> getSearchPaperList(String str){
		
		List<Paper> resultList  = new ArrayList<Paper>();
		
		List<Paper> dec1Result = paperRepository.findByDescription1Contains(str);
//		List<Paper> dec2Result = paperRepository.findByDescription_2Contains(str);
//		List<Paper> dec3Result = paperRepository.findByDescription_3Contains(str);
		
		resultList = dec1Result;
		
		return resultList;
	}
	
	private Header<PaperSearchResponse> response(List<Paper> searchedPaper) {

		PaperSearchResponse paperSearchResponse = PaperSearchResponse.builder().searchedPaper(searchedPaper).build();

		return Header.OK(paperSearchResponse);

	}

}
