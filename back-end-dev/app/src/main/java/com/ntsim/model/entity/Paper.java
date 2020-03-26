package com.ntsim.model.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paper {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	private String description_1;
	// 설명 2
	private String description_2;
	// 설명 3
	private String description_3;
	// 작성자
	private String studentNumber;
	
}
