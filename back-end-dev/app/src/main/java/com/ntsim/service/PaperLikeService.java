package com.ntsim.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Like;
import com.ntsim.model.entity.Paper;
import com.ntsim.model.entity.User;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperLikeRequest;
import com.ntsim.model.network.response.PaperLikeResponse;
import com.ntsim.repository.LikeRepository;
import com.ntsim.repository.PaperRepository;
import com.ntsim.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PaperLikeService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PaperRepository paperRepository;

	@Autowired
	private LikeRepository likeRepository;

	private Integer likedOrNot;

	public Header<PaperLikeResponse> likePaper(String studentNumber, Header<PaperLikeRequest> paperLikeRequest) {

		likedOrNot = 0; // return value 0:cancel like, 1:do like

		PaperLikeRequest rRequest = paperLikeRequest.getData();

		log.info(rRequest.toString());

		Integer likeOrNot = rRequest.getLikeOrNot();

		Optional<User> user = userRepository.findById(studentNumber);
		Optional<Paper> paper = paperRepository.findById(rRequest.getPaperId());

		paper.ifPresent(p -> {
			user.ifPresent(u -> {

				if (likeOrNot == 0) { // Cancel like
					likeRepository.deleteLikeTable(u, p);

					Long prevLike = p.getLikeCount();
					p.setLikeCount(prevLike - 1);

					paperRepository.save(p);

					likedOrNot = 0;
				} else { // Do like
					likeRepository.insertLikeTable(u, p);

					Long prevLike = p.getLikeCount();
					p.setLikeCount(prevLike + 1);

					paperRepository.save(p);

					likedOrNot = 1;
				}
			});
		});

		return response(likedOrNot, rRequest.getPaperId());
	}

	public List<String> getMyLikeList(String studentNumber) {
		List<String> myLikedPaper = new ArrayList<String>();
		Optional<User> user = userRepository.findById(studentNumber);

		user.ifPresent(u -> {
			List<Like> likes = likeRepository.findByUser(u);
			for (Like l : likes) {
				myLikedPaper.add(l.getPaper().getId() + "");
			}
		});
		return myLikedPaper;
	}

	private Header<PaperLikeResponse> response(Integer likeOrNot, Long paperId) {
		PaperLikeResponse paperLikeResponse = PaperLikeResponse.builder().likeOrNot(likeOrNot).paperId(paperId).build();

		return Header.OK(paperLikeResponse);
	}

}
