package com.ntsim.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ntsim.model.entity.Hashtag;
import com.ntsim.model.entity.Paper;
import com.ntsim.model.entity.User;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.UserApiRequest;
import com.ntsim.model.network.response.MainViewResponse;
import com.ntsim.model.network.response.UserApiResponse;
import com.ntsim.repository.HashtagRepository;
import com.ntsim.repository.PaperRepository;
import com.ntsim.repository.UserRepository;

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
			filteredPaper.add(paperRepository.getOne(allHashtag.get(i).getPaperId()));
		}
		return filteredPaper;
	}
}
