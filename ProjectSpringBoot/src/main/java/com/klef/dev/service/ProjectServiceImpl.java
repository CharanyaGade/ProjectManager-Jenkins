package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.dev.entity.Project;
import com.klef.dev.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public List<Project> viewAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(int id) {
        Optional<Project> optional = projectRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public String deleteProject(int id) {
        Optional<Project> optional = projectRepository.findById(id);
        if (optional.isPresent()) {
            projectRepository.deleteById(id);
            return "Project deleted successfully";
        } else {
            return "Project not found";
        }
    }
}
