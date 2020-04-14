package com.ntsim.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class S3UploaderRequest {
	private String year;
	
	private String category;
	
	private String professor;
	
	private String github;
}
