package com.ntsim.service.PaperService;

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

	@Autowired
	private PaperViewApiService paperViewApiService;
	
	public Header<PaperDetailResponse> getDetail(String studentNumber, Header<PaperDetailRequest> paperDetailRequest) {

		PaperDetailRequest request = paperDetailRequest.getData();
		
		paperViewApiService.increaseViewCount(studentNumber, request.getPaperId());
		
		return paperRepository.findById(request.getPaperId()).map(paper -> response(paper)).orElseGet(() -> Header.ERROR("데이터 없음"));
	}
	
	private Header<PaperDetailResponse> response(Paper paper) {

		PaperDetailResponse paperDetailResponse = PaperDetailResponse.builder().keyName(paper.getKeyName())
				.github(paper.getGithub()).year(paper.getYear()).category(paper.getCategory())
				.professor(paper.getProfessor()).description1(paper.getDescription1())
				.description2(paper.getDescription2()).description3(paper.getDescription3())
				.studentNumber(paper.getStudentNumber()).title(paper.getTitle()).hashtag(paper.getHashtag()).build();

		return Header.OK(paperDetailResponse);

	}
	
}
