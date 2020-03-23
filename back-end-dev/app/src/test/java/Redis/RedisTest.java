package Redis;

import java.io.Serializable;
import java.security.Key;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import com.ntsim.HotSpringDockerApplicationTests;
import com.ntsim.jwt.jwtToken;
import com.ntsim.model.entity.User;
import com.ntsim.redis.Redis;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@RunWith(SpringRunner.class)
public class RedisTest extends HotSpringDockerApplicationTests {

	@Autowired
	private RedisTemplate<Serializable, Serializable> redisTemplate;

	@Autowired
	private jwtToken jwtToken;

	@Test
	public void RedisTest() throws Exception {

		String key = "Spring";
		String value = "jcm";
		Redis.set(key, value, redisTemplate);

		System.out.println(Redis.get(key, redisTemplate));
		System.out.println(redisTemplate.getConnectionFactory().getConnection());

		Key jwtkey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
		String jws = Jwts.builder().setSubject("Joe").signWith(jwtkey).compact();

		User user1 = User.builder().studentNumber("201402420").userEmail("qpdjgjsl@gmail.com").userPassword("1234")
				.build();
		String token1 = jwtToken.getUserToken(user1);
		System.out.println(token1);

		System.out.println(jwtToken.getUserEmail(token1));
	}
}
