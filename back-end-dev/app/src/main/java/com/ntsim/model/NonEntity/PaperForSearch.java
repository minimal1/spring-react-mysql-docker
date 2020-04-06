package com.ntsim.model.NonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaperForSearch {
	
	private Long id;
	// S3 key value
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
	// 작성자
	private String studentNumber;
	
	private String thumbnail;

	private String title;	
	
	private Integer count;
	
	private Long likeCount;
	
	private Long viewCount;
}
