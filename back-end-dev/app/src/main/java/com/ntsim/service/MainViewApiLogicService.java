package com.ntsim.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.entity.User;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.UserApiRequest;
import com.ntsim.model.network.response.MainViewResponse;
import com.ntsim.model.network.response.UserApiResponse;
import com.ntsim.repository.PaperRepository;
import com.ntsim.repository.UserRepository;

@Service
public class MainViewApiLogicService {
	
	@Autowired
	private PaperRepository paperRepository;
	
	public Header<MainViewResponse> getAll() {
		List<Paper> allPaper = paperRepository.findAll();
		return response(allPaper);
	}
	
	private Header<MainViewResponse> response(List<Paper> allPaper) {

		MainViewResponse mainViewResponse = MainViewResponse.builder().allPaper(allPaper).build();

		return Header.OK(mainViewResponse);

	}
}
