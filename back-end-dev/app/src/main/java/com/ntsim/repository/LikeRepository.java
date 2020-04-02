package com.ntsim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ntsim.model.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

}
