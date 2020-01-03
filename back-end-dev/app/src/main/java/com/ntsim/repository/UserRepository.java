package com.ntsim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ntsim.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
