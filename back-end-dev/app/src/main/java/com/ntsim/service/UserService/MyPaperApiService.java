package com.ntsim.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.MyPaperResponse;
import com.ntsim.repository.PaperRepository;
import com.ntsim.service.PaperService.PaperLikeService;

@Service
public class MyPaperApiService {

	@Autowired
	private PaperRepository paperRepository;
	
	@Autowired
	private PaperLikeService paperLikeService;
	
	public Header<MyPaperResponse> getMyPaper(String studentNumber) {

		List<Paper> myPaper = paperRepository.findByStudentNumber(studentNumber);
		
		List<String> myLikePaper = paperLikeService.getMyLikeList(studentNumber);
		
		return response(myPaper, myLikePaper);
	}

	
	private Header<MyPaperResponse> response(List<Paper> allPaper, List<String> myLikePaper) {

		MyPaperResponse myPaperResponse = MyPaperResponse.builder().myPaper(allPaper).likedPaper(myLikePaper).build();

		return Header.OK(myPaperResponse);
	}
	
}
