package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
