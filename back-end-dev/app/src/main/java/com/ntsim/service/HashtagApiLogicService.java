package com.ntsim.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Hashtag;
import com.ntsim.model.entity.Paper;
import com.ntsim.repository.HashtagRepository;
import com.ntsim.repository.PaperRepository;

@Service
public class HashtagApiLogicService {

	@Autowired
	private HashtagRepository hashtagRepository;

	@Autowired
	private PaperRepository paperRepository;

	public List<Paper> getAllByHashtag(String hashtag) {
		List<Hashtag> allHashtag = hashtagRepository.findByHashtag(hashtag);
		List<Paper> filteredPaper = new ArrayList<Paper>();
		for (int i = 0; i < allHashtag.size(); i++) {
			Optional<Paper> paper = paperRepository.findById(allHashtag.get(i).getPaperId());
			paper.ifPresent(p -> {
				filteredPaper.add(p);
			});
//			if(paper.isPresent()) {
//				filteredPaper.addAll(paperRepository.findById(allHashtag.get(i).getPaperId()));
//			}
		}
		return filteredPaper;
	}
}
