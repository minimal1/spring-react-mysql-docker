package com.ntsim.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserApiResponse {
	
	private String resultCode;
	
	private Integer studentNumber;
	
	private String userPassword;
	
	private String userEmail;

}
