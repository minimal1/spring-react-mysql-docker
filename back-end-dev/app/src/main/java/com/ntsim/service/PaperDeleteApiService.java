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
	
	public Header deleteMyPaper(Header<PaperDeleteRequest> paperDeleteRequest) {

		PaperDeleteRequest request = paperDeleteRequest.getData();
		
		Optional<Paper> paperCheck = paperRepository.findById(request.getPaperId());
		
		paperCheck.map(paper -> {
			paperRepository.delete(paper);
			return Header.OK();
		}).orElseGet(() -> Header.ERROR("데이터 없음"));

		return null;
	}

}
