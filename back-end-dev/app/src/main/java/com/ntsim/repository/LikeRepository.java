package com.ntsim.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ntsim.model.entity.Like;
import com.ntsim.model.entity.Paper;
import com.ntsim.model.entity.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
	@Query(value = "SELECT * FROM minimal_db.`like` where user_student_number = ?1", nativeQuery = true)
	List<Like> findByUser(User user);
	
	@Query(value = "SELECT * FROM minimal_db.`like` where user_student_number = ?1 and paper_id = ?2", nativeQuery = true)
	Optional<Like> findByUserAndPaper(User user, Paper paper);
	
	@Modifying
	@Transactional
	@Query(value = "INSERT into minimal_db.`like` (user_student_number, paper_id) values (?1, ?2)", nativeQuery = true)
	int insertLikeTable(User user, Paper paper);
	
	@Modifying
	@Transactional
	@Query(value = "DELETE from minimal_db.`like` where user_student_number = ?1 and paper_id = ?2", nativeQuery = true)
	int deleteLikeTable(User user, Paper paper);
}
