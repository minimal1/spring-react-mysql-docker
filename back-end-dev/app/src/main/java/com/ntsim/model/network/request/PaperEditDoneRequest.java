package com.ntsim.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PaperEditDoneRequest {
	
	// Github url
	private String newGithub;
	// 제출년도.
	private String newYear;
	// 분야.
	private String newCategory;
	// 담당교수.
	private String newProfessor;
	// 설명 1
	private String newDescription_1;
	// 설명 2
	private String newDescription_2;
	// 설명 3
	private String newDescription_3;
}
