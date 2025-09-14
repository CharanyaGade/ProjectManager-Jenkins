package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "project_table")
public class Project {

    @Id
    @Column(name = "project_id")
    private int id;

    @Column(name = "project_title", nullable = false, length = 10)
    private String title;

    @Column(name = "project_description", nullable = false, length = 50)
    private String description;

    @Column(name = "project_domain", nullable = false, length = 255)
    private String domain;

    @Column(name = "project_status", nullable = false, length = 20)
    private String status; // ONGOING, COMPLETED, ON-HOLD

    @Column(name = "project_guide", nullable = false, length = 10)
    private String guide;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getGuide() { return guide; }
    public void setGuide(String guide) { this.guide = guide; }

    @Override
    public String toString() {
        return "Project [id=" + id + ", title=" + title + ", description=" + description
                + ", domain=" + domain + ", status=" + status + ", guide=" + guide + "]";
    }
}

