package com.ntsim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ntsim.model.entity.Paper;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long>{

}
