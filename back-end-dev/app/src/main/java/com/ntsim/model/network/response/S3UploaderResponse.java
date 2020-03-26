package com.ntsim.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class S3UploaderResponse {
	
	private String keyName;
	// Github url
	private String github;
	// 제출년도.
	private String year;
	// 분야.
	private String category;
	// 담당교수.
	private String professor;
	// 설명 1
	private String description_1;
	// 설명 2
	private String description_2;
	// 설명 3
	private String description_3;

	
}