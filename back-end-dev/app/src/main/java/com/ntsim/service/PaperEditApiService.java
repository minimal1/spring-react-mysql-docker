package com.ntsim.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperEditDoneRequest;
import com.ntsim.model.network.response.PaperEditResponse;
import com.ntsim.repository.PaperRepository;

@Service
public class PaperEditApiService {

	@Autowired
	private PaperRepository paperRepository;

	// 기존에 존재하는 논문의 정보를 response
	public Header<PaperEditResponse> editPapaer(Long id) {

		return paperRepository.findById(id).map(paper -> responsePaperInfo(paper))
				.orElseGet(() -> Header.ERROR("데이터 없음"));
	}

	// 변경된 정보를 DB에 반영하고 결과를 response
	public Header editPaperDone(Long id, Header<PaperEditDoneRequest> paperEditDoneRequest) {

		PaperEditDoneRequest uRequest  = paperEditDoneRequest.getData();
		
		Optional<Paper> paperCheck = paperRepository.findById(id);
		
		return paperCheck.map(paper -> {
			paper.setCategory(uRequest.getNewCategory());
			paper.setYear(uRequest.getNewYear());
			paper.setProfessor(uRequest.getNewProfessor());
			paper.setDescription1(uRequest.getNewDescription_1());
			paper.setDescription2(uRequest.getNewDescription_2());
			paper.setDescription3(uRequest.getNewDescription_3());
			paper.setGithub(uRequest.getNewGithub());
			paper.setHashtag(uRequest.getNewHashtag());
			
			return paper;
		}).map(paper -> paperRepository.save(paper)).map(paper -> Header.OK()).orElseGet(() -> Header.ERROR("데이터 없음"));
	}

	private Header<PaperEditResponse> responsePaperInfo(Paper paper) {

		PaperEditResponse paperEditResponse = PaperEditResponse.builder().github(paper.getGithub())
				.year(paper.getYear()).category(paper.getCategory()).professor(paper.getProfessor())
				.description1(paper.getDescription1()).description2(paper.getDescription2())
				.description3(paper.getDescription3()).studentNumber(paper.getStudentNumber()).hashtag(paper.getHashtag()).build();

		return Header.OK(paperEditResponse);
	}

}
