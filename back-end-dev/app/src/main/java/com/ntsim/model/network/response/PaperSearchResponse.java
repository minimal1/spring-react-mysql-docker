package com.ntsim.model.network.response;

import java.util.List;

import com.ntsim.model.NonEntity.PaperForSearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaperSearchResponse {
	private List<PaperForSearch> searchedPaper;

	private List<String> likedPaper;
}
