package com.ntsim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperDetailRequest;
import com.ntsim.model.network.response.PaperDetailResponse;
import com.ntsim.repository.PaperRepository;

@Service
public class PaperDetailService {

	@Autowired
	private PaperRepository paperRepository;

	public Header<PaperDetailResponse> getDetail(Header<PaperDetailRequest> paperDetailRequest) {

		PaperDetailRequest request = paperDetailRequest.getData();
		
		return paperRepository.findById(request.getPaperId()).map(paper -> response(paper)).orElseGet(() -> Header.ERROR("데이터 없음"));
	}
	
	private Header<PaperDetailResponse> response(Paper paper) {

		PaperDetailResponse paperDetailResponse = PaperDetailResponse.builder().keyName(paper.getKeyName())
				.github(paper.getGithub()).year(paper.getYear()).category(paper.getCategory())
				.professor(paper.getProfessor()).description_1(paper.getDescription_1())
				.description_2(paper.getDescription_2()).description_3(paper.getDescription_3())
				.studentNumber(paper.getStudentNumber()).build();

		return Header.OK(paperDetailResponse);

	}
	
}
