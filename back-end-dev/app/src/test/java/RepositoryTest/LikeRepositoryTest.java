package RepositoryTest;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;

import com.ntsim.HotSpringDockerApplicationTests;
import com.ntsim.model.entity.Like;
import com.ntsim.model.entity.Paper;
import com.ntsim.model.entity.User;
import com.ntsim.repository.LikeRepository;
import com.ntsim.repository.PaperRepository;
import com.ntsim.repository.UserRepository;

@RunWith(SpringRunner.class)
public class LikeRepositoryTest extends HotSpringDockerApplicationTests{
	
	@Autowired
	private LikeRepository likeRepository;
	@Autowired
	private PaperRepository paperRepository;
	@Autowired
	private UserRepository userRepository;
	
	
	@Test
	@Transactional
	public void testLike() {
		
//		Optional<User> user = userRepository.findById("123");
//		
//		user.ifPresent(u -> {
//			Optional<Like> l = likeRepository.findByUser(u);
//			System.out.println(l);
//			
//		});
//		
		System.out.println("qwe");
		Optional<Paper> paper = paperRepository.findById((long) 1);
		
		Optional<User> user = userRepository.findById("123");
		
		System.out.println("start");
		paper.ifPresent(p -> {
			System.out.println(p);
//			user.ifPresent(u -> {
//				System.out.println(u);
//				Optional<Like> like = likeRepository.findByUserAndPaper(u, p);
//				
//				System.out.println(like);
//			});
		});
	
	
	}	
	
}
