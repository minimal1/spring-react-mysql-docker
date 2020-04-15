package com.ntsim.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.NonEntity.PaperForSearch;
import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperSearchRequest;
import com.ntsim.model.network.response.PaperSearchResponse;
import com.ntsim.repository.PaperRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PaperSearchService {

	@Autowired
	private PaperRepository paperRepository;

	@Autowired
	private PaperLikeService paperLikeService;
	
	public Header<PaperSearchResponse> searchPaper(String studentNumber, Header<PaperSearchRequest> request) {

		PaperSearchRequest rRequest = request.getData();
		List<PaperForSearch> resultPaperList = getSearchPaperList(rRequest.getQuery());
		
		if(studentNumber == null) {
			return response(resultPaperList, null);

		} else {
			List<String> myLikePaper = paperLikeService.getMyLikeList(studentNumber);
			
			return response(resultPaperList, myLikePaper);
		}
		
	}

	private List<PaperForSearch> getSearchPaperList(String str) {

		List<PaperForSearch> resultList = new ArrayList<PaperForSearch>();

		List<Paper> desc1Result = paperRepository.findByDescription1Contains(str);
		List<PaperForSearch> desc1ForSearch = new ArrayList<PaperForSearch>();

		List<Paper> desc2Result = paperRepository.findByDescription2Contains(str);
		List<PaperForSearch> desc2ForSearch = new ArrayList<PaperForSearch>();

		List<Paper> desc3Result = paperRepository.findByDescription3Contains(str);
		List<PaperForSearch> desc3ForSearch = new ArrayList<PaperForSearch>();
		
		List<Paper> titleResult = paperRepository.findByTitleContains(str);
		List<PaperForSearch> titleForSearch = new ArrayList<PaperForSearch>();

		Map<Long, PaperForSearch> countingMap = new HashMap<Long, PaperForSearch>();

		for (Paper paper : desc1Result) {
			PaperForSearch tempPaper = PaperForSearch.builder().id(paper.getId()).keyName(paper.getKeyName()).year(paper.getYear())
					.github(paper.getGithub()).category(paper.getCategory()).professor(paper.getProfessor())
					.studentNumber(paper.getStudentNumber()).description1(paper.getDescription1())
					.description2(paper.getDescription2()).description3(paper.getDescription3()).hashtag(paper.getHashtag())
					.thumbnail(paper.getThumbnail()).title(paper.getTitle()).likeCount(paper.getLikeCount()).viewCount(paper.getViewCount()).count(1).build();

			desc1ForSearch.add(tempPaper);
		}

		for (Paper paper : desc2Result) {
			PaperForSearch tempPaper = PaperForSearch.builder().id(paper.getId()).keyName(paper.getKeyName()).year(paper.getYear())
					.github(paper.getGithub()).category(paper.getCategory()).professor(paper.getProfessor())
					.studentNumber(paper.getStudentNumber()).description1(paper.getDescription1())
					.description2(paper.getDescription2()).description3(paper.getDescription3()).hashtag(paper.getHashtag())
					.thumbnail(paper.getThumbnail()).title(paper.getTitle()).likeCount(paper.getLikeCount()).viewCount(paper.getViewCount()).count(1).build();

			desc2ForSearch.add(tempPaper);
		}

		for (Paper paper : desc3Result) {
			PaperForSearch tempPaper = PaperForSearch.builder().id(paper.getId()).keyName(paper.getKeyName()).year(paper.getYear())
					.github(paper.getGithub()).category(paper.getCategory()).professor(paper.getProfessor())
					.studentNumber(paper.getStudentNumber()).description1(paper.getDescription1())
					.description2(paper.getDescription2()).description3(paper.getDescription3()).hashtag(paper.getHashtag())
					.thumbnail(paper.getThumbnail()).title(paper.getTitle()).likeCount(paper.getLikeCount()).viewCount(paper.getViewCount()).count(1).build();

			desc3ForSearch.add(tempPaper);
		}
		
		for (Paper paper : titleResult) {
			PaperForSearch tempPaper = PaperForSearch.builder().id(paper.getId()).keyName(paper.getKeyName()).year(paper.getYear())
					.github(paper.getGithub()).category(paper.getCategory()).professor(paper.getProfessor())
					.studentNumber(paper.getStudentNumber()).description1(paper.getDescription1())
					.description2(paper.getDescription2()).description3(paper.getDescription3()).hashtag(paper.getHashtag())
					.thumbnail(paper.getThumbnail()).title(paper.getTitle()).likeCount(paper.getLikeCount()).viewCount(paper.getViewCount()).count(1).build();

			titleForSearch.add(tempPaper);
		}

		for (PaperForSearch paper : desc1ForSearch) {
			countingMap.put(paper.getId(), paper);
		}
		
		for (PaperForSearch paper : desc2ForSearch) {
			if (countingMap.containsKey(paper.getId())) {
				PaperForSearch tempPaperCount = countingMap.get(paper.getId());
				tempPaperCount.setCount(tempPaperCount.getCount() + 1);
			} else {
				countingMap.put(paper.getId(), paper);
			}
		}

		for (PaperForSearch paper : desc3ForSearch) {
			if (countingMap.containsKey(paper.getId())) {
				PaperForSearch tempPaperCount = countingMap.get(paper.getId());
				tempPaperCount.setCount(tempPaperCount.getCount() + 1);
			} else {
				countingMap.put(paper.getId(), paper);
			}
		}
		
		for (PaperForSearch paper : titleForSearch) {
			if (countingMap.containsKey(paper.getId())) {
				PaperForSearch tempPaperCount = countingMap.get(paper.getId());
				tempPaperCount.setCount(tempPaperCount.getCount() + 1);
			} else {
				countingMap.put(paper.getId(), paper);
			}
		}

		countingMap.values().forEach((value) -> resultList.add(value));

		return resultList;
	}

	private Header<PaperSearchResponse> response(List<PaperForSearch> searchedPaper, List<String> myLikePaper) {

		PaperSearchResponse paperSearchResponse = PaperSearchResponse.builder().searchedPaper(searchedPaper).likedPaper(myLikePaper).build();

		return Header.OK(paperSearchResponse);

	}

}
