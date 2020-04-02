package com.ntsim.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ntsim.model.entity.Like;
import com.ntsim.model.entity.Paper;
import com.ntsim.model.entity.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
	Optional<Like> findByUser(User user);
	Optional<Like> findByUserAndPaper(User user, Paper paper);
}
