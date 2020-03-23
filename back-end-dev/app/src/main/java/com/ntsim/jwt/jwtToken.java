package com.ntsim.jwt;

import java.io.Serializable;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.ntsim.model.entity.User;
import com.ntsim.redis.Redis;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class jwtToken {

	@Autowired
	public RedisTemplate<Serializable, Serializable> redisTemplate;

	private static final String headerString = "X-JWT";
	private String secretKey = "qwertqwertqwertqwertqwert".trim();
	private byte[] apiKeySecretBytes = Base64.getEncoder().encode(secretKey.getBytes());
	private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
	private final Key KEY = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

	// make JWT token
	public String getUserToken(User user) {

		String jwt = Jwts.builder().setHeaderParam("typ", "JWT").setSubject("loginToken")
				.claim("uid", user.getStudentNumber()).claim("email", user.getUserEmail())
				.setExpiration(new Date(System.currentTimeMillis() + 1 * (1000 * 60 * 60 * 24)))
				.signWith(KEY, signatureAlgorithm).compact();

		return jwt;
	}

	// Token check
	public Boolean validateToken(String jwt) {
		if (jwt != null) {
			String userKey = this.getUserUID(jwt);
			String key = Redis.get(userKey, redisTemplate);

			if (key.equals(jwt)) {
				return true;
			}
			return false;
		}
		return false;
	}

	// Token validate time
	public Boolean getExpToken(String jwt) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(KEY).parseClaimsJws(jwt);
			Date exp = claims.getBody().getExpiration();

			Date now = new Date();

			if (exp.after(now)) {
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	public String getUserUID(String jwt) throws RuntimeException {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(KEY).parseClaimsJws(jwt);
			return claims.getBody().get("uid") + "";
		} catch (Exception e) {
			return null;
		}
	}

	public String getUserEmail(String jwt) throws RuntimeException {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(KEY).parseClaimsJws(jwt);
			return claims.getBody().get("email") + "";
		} catch (Exception e) {
			return null;
		}
	}

}
