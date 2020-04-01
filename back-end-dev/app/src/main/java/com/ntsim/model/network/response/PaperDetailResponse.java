package com.ntsim.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaperDetailResponse {
	
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
	private String description1;
	// 설명 2
	private String description2;
	// 설명 3
	private String description3;
	// 작성자 아이디
	private String studentNumber;
	
	private String title;
	private String hashtag;

}
