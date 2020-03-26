package com.ntsim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.S3UploaderResponse;
import com.ntsim.repository.PaperRepository;

@Service
public class PaperApiLogicService {
	@Autowired
	private PaperRepository paperRepository;
	
	public Header<S3UploaderResponse> upload(String key, String year, String category,String professor,
			String github, String description_1, String description_2, String description_3, String studentNumber) {
		Paper paper = Paper.builder()
				.keyName(key)
				.github(github)
				.year(year)
				.category(category)
				.professor(professor)
				.description_1(description_1)
				.description_2(description_2)
				.description_3(description_3)
				.studentNumber(studentNumber)
				.build();
		
		Paper newPaper = paperRepository.save(paper);

		return response(newPaper);
	}
	private Header<S3UploaderResponse> response(Paper paper) {
		
		S3UploaderResponse s3UploaderResponse = S3UploaderResponse.builder()
				.keyName(paper.getKeyName())
				.github(paper.getGithub())
				.year(paper.getYear())
				.category(paper.getCategory())
				.professor(paper.getProfessor())
				.description_1(paper.getDescription_1())
				.description_2(paper.getDescription_2())
				.description_3(paper.getDescription_3())
				.build();
		
		return Header.OK(s3UploaderResponse);

	}
}