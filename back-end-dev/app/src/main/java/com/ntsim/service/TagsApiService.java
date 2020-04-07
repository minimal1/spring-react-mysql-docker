package com.ntsim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.TagsResponse;
import com.ntsim.repository.HashtagRepository;
import com.ntsim.repository.PaperRepository;

@Service
public class TagsApiService {

	@Autowired
	private PaperRepository paperRepository;
	
	@Autowired
	private HashtagRepository hashtagRepository;

	@Autowired
	private PaperLikeService paperLikeService;

	@Autowired
	private HashtagApiLogicService hashtagApiLogicService;

	public Header<TagsResponse> filterPaper(String studentNumber, String division, String searchString) {

		List<Paper> filteredPaper = null;

		if (division.startsWith("p")) { // professor
			filteredPaper = paperRepository.findByProfessor(searchString.trim());
		} else if (division.startsWith("y")) { // year
			filteredPaper = paperRepository.findByYear(searchString);
		} else if (division.startsWith("c")) { // category
			filteredPaper = paperRepository.findByCategory(searchString);
		} else if (division.startsWith("h")) { // hashtag
			filteredPaper = hashtagApiLogicService.getAllByHashtag(searchString);
//			filteredPaper = hashtagRepository.findPaperByHashtag(searchString);
		}

		if (studentNumber == null) {
			return response(filteredPaper, null);
		} else {
			List<String> myLikePaper = paperLikeService.getMyLikeList(studentNumber);
			return response(filteredPaper, myLikePaper);
		}

	}

	private Header<TagsResponse> response(List<Paper> allPaper, List<String> myLikePaper) {

		TagsResponse tagsResponse = TagsResponse.builder().filteredPaper(allPaper).likedPaper(myLikePaper).build();

		return Header.OK(tagsResponse);

	}

}
