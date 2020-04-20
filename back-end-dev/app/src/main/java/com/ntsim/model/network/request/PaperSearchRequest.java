package com.ntsim.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaperSearchRequest {
	private String keyword;

	private String year;
	
	private String professor;
	
	private String category;
	
	private String hashtag;
}
