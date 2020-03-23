package com.ntsim.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserApiRequest {
	private String id;
	
	private String pw;
	
	private String email;
	
	private String accessToken;
}
