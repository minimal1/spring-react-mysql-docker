package RepositoryTest;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.ntsim.HotSpringDockerApplicationTests;
import com.ntsim.model.entity.User;
import com.ntsim.repository.UserRepository;

public class UserRepositoryTest extends HotSpringDockerApplicationTests{

	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void create() {
		User user = new User();
		user.setStudentNumber(201402420);
		user.setUserPassword("1234");
		user.setUserEmail("test@gmail.com");
		
		System.out.println("1"+userRepository);
		System.out.println("3" + user);
		User newUser = userRepository.save(user);
		System.out.println("2"+newUser);
	}
}
