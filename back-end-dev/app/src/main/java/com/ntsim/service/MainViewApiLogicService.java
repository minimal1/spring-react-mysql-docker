package com.ntsim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.MainViewResponse;
import com.ntsim.repository.PaperRepository;
import com.ntsim.service.PaperService.PaperLikeService;

@Service
public class MainViewApiLogicService {
	
	@Autowired
	private PaperRepository paperRepository;
	
	@Autowired
	private PaperLikeService paperLikeService;
	
	public Header<MainViewResponse> getAll(String studentNumber) {
		List<Paper> allPaper = paperRepository.findAll();

		if(studentNumber == null) {
			return response(allPaper, null);
		} else {
			List<String> myLikePaper = paperLikeService.getMyLikeList(studentNumber);
			
			return response(allPaper, myLikePaper);
		}
	}
	
	private Header<MainViewResponse> response(List<Paper> allPaper, List<String> myLikePaper) {

		MainViewResponse mainViewResponse = MainViewResponse.builder().allPaper(allPaper).likedPaper(myLikePaper).build();

		return Header.OK(mainViewResponse);

	}
}
