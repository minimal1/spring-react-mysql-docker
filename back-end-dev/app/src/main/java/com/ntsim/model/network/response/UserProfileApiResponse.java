package com.ntsim.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserProfileApiResponse {

	private String studentNumber;

	private String password;

	private String email;

	private String accessToken;
}
