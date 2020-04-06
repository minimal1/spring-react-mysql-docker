package com.ntsim.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ntsim.model.entity.Paper;
import com.ntsim.model.entity.User;
import com.ntsim.model.entity.View;

@Repository
public interface ViewRepository extends JpaRepository<View, Long> {
	
	@Query(value = "SELECT * FROM minimal_db.`view` where user_student_number = ?1 and paper_id = ?2", nativeQuery = true)
	Optional<View> findByUserAndPaper(User user, Paper paper);
	
	
	@Modifying
	@Transactional
	@Query(value = "INSERT into minimal_db.`view` (user_student_number, paper_id) values (?1, ?2)", nativeQuery = true)
	int insertViewTable(User user, Paper paper);
	
//	@Query(value = "SELECT * FROM minimal_db.`like` where user_student_number = ?1", nativeQuery = true)
//	List<View> findByUser(User user);
//	
//	@Query(value = "SELECT * FROM minimal_db.`like` where user_student_number = ?1 and paper_id = ?2", nativeQuery = true)
//	Optional<View> findByUserAndPaper(User user, Paper paper);
//	
//	@Modifying
//	@Transactional
//	@Query(value = "INSERT into minimal_db.`like` (user_student_number, paper_id) values (?1, ?2)", nativeQuery = true)
//	int insertLikeTable(User user, Paper paper);
//	
//	@Modifying
//	@Transactional
//	@Query(value = "DELETE from minimal_db.`like` where user_student_number = ?1 and paper_id = ?2", nativeQuery = true)
//	int deleteLikeTable(User user, Paper paper);
}
