package com.ntsim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ntsim.model.entity.Hashtag;
import com.ntsim.model.entity.Paper;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
	List<Hashtag> findByHashtag(String hashtag);
	
	@Query(value = "SELECT p.id, p.key_name, p.github, p.year, p.category, p.professor, p.description_1, p.description_2, p.description_3, p.student_number, p.thumbnail, p.title, p.hashtag, p.like_count, p.view_count\n" + 
			"FROM minimal_db.`paper` as p \n" + 
			"LEFT JOIN minimal_db.`hashtag` as h \n" + 
			"ON p.id = h.paper_id\n" + 
			"where h.hashtag = ?1", nativeQuery = true)
	List<Paper> findPaperByHashtag(String hashtag);
}
