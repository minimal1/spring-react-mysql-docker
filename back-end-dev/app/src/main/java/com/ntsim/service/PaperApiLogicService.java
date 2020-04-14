package com.ntsim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Hashtag;
import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.response.S3UploaderResponse;
import com.ntsim.repository.HashtagRepository;
import com.ntsim.repository.PaperRepository;

@Service
public class PaperApiLogicService {
	@Autowired
	private PaperRepository paperRepository;

	@Autowired
	private HashtagRepository hashtagRepository;

	public Header<S3UploaderResponse> upload(String key, String year, String category, String professor, String github,
			String description_1, String description_2, String description_3, String studentNumber,
			String uploadThumbNail, String title, String hashtag) {
		Paper paper = Paper.builder().keyName(key).github(github).year(year).category(category).professor(professor.trim())
				.description1(description_1).description2(description_2).description3(description_3)
				.studentNumber(studentNumber).thumbnail(uploadThumbNail).title(title).likeCount(Long.parseLong("0"))
				.viewCount(Long.parseLong("0")).hashtag(hashtag).build();

		Paper newPaper = paperRepository.save(paper);

		System.out.println(hashtag);
		String[] hashtag_list = hashtag.split("/");
		System.out.println(hashtag_list);
		for (int i = 0; i < hashtag_list.length; i++) {
			System.out.println(hashtag_list[i]);
			Hashtag ht = Hashtag.builder().paperId(paper.getId()).hashtag(hashtag_list[i]).build();
			hashtagRepository.save(ht);
		}

		return response(newPaper);
	}

	private Header<S3UploaderResponse> response(Paper paper) {

		S3UploaderResponse s3UploaderResponse = S3UploaderResponse.builder().paperId(paper.getId()).build();

		return Header.OK(s3UploaderResponse);

	}
}
