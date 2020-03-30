package com.ntsim.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.network.Header;
import com.ntsim.model.network.request.PaperDeleteRequest;
import com.ntsim.repository.PaperRepository;

@Service
public class PaperDeleteApiService {

	@Autowired
	private PaperRepository paperRepository;

	private boolean paperDeleted = false;

	public Header deleteMyPaper(Header<PaperDeleteRequest> paperDeleteRequest) {
		paperDeleted = false;
		PaperDeleteRequest request = paperDeleteRequest.getData();

		Optional<Paper> paperCheck = paperRepository.findById(request.getPaperId());

		paperCheck.ifPresent(paper -> {
			paperRepository.delete(paper);
			paperDeleted = true;
		});

		if(paperDeleted) {
			return Header.OK();
		} else {
			return Header.ERROR("해당 논문은 이미 삭제된 논문입니다.");
		}
	}
}