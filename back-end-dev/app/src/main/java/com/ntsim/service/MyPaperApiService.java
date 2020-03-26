package com.ntsim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.MyPaperResponse;
import com.ntsim.repository.PaperRepository;

@Service
public class MyPaperApiService {

	@Autowired
	private PaperRepository paperRepository;
	
	public Header<MyPaperResponse> getMyPaper(String studentNumber) {

		List<Paper> myPaper = paperRepository.findByStudentNumber(studentNumber);
		
		return response(myPaper);
	}

	
	private Header<MyPaperResponse> response(List<Paper> allPaper) {

		MyPaperResponse myPaperResponse = MyPaperResponse.builder().myPaper(allPaper).build();

		return Header.OK(myPaperResponse);
	}
	
}
