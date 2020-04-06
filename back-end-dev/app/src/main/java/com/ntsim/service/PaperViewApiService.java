package com.ntsim.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.entity.User;
import com.ntsim.model.entity.View;
import com.ntsim.repository.PaperRepository;
import com.ntsim.repository.UserRepository;
import com.ntsim.repository.ViewRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PaperViewApiService {

	@Autowired
	private ViewRepository viewRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PaperRepository paperRepository;

	public void increaseViewCount(String studentNumber, Long paperId) {
		/*
		 * 일단 테이블에 있는 지확인 한다. 없는 경우 만들고 1 값을 증가시킨다.
		 */
		
		log.info(studentNumber);
		
		if (studentNumber != null) {
			Optional<User> userCheck = userRepository.findById(studentNumber);
			Optional<Paper> paperCheck = paperRepository.findById(paperId);

			userCheck.ifPresent(u -> {
				paperCheck.ifPresent(p -> {
					Optional<View> viewCheck = viewRepository.findByUserAndPaper(u, p);
					if (viewCheck.isPresent()) {
						// already viewed.
					} else { // create view.
						viewRepository.insertViewTable(u, p);

						Long preView = p.getViewCount();
						p.setViewCount(preView + 1);

						paperRepository.save(p);
					}
				});
			});
		}
	}

}
