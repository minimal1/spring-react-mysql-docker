package RepositoryTest;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;

import com.ntsim.HotSpringDockerApplicationTests;
import com.ntsim.model.entity.User;
import com.ntsim.repository.UserRepository;

@RunWith(SpringRunner.class)
public class UserRepositoryTest extends HotSpringDockerApplicationTests{

	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void create() {
		User user = new User();
		user.setStudentNumber("201402420");
		user.setUserPassword("1234");
		user.setUserEmail("test@gmail.com");
		
		System.out.println("1"+userRepository);
		System.out.println("3" + user);
		User newUser = userRepository.save(user);
		System.out.println("2"+newUser);
		
		Optional<User> u = userRepository.findById("201402420");
		System.out.println(u);
	}
}
