package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Project;

public interface ProjectService {
    Project addProject(Project project);
    List<Project> viewAllProjects();
    Project getProjectById(int id);
    Project updateProject(Project project);
    String deleteProject(int id);
}
