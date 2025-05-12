package com.ISCOD_Eval.pmt_backend.controllers;

public class TaskRequest {
    private String title;
    private String description;
    private String dueDate;
    private String priority;
    private String status;
    private Long projectId;
    private Long assignedToId; // ✅ Nouveau champ

    // Constructors
    public TaskRequest() {}

    public TaskRequest(String title, String description, String dueDate, String priority, String status, Long projectId, Long assignedToId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.projectId = projectId;
        this.assignedToId = assignedToId;
    }

    // Getters
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getDueDate() { return dueDate; }
    public String getPriority() { return priority; }
    public String getStatus() { return status; }
    public Long getProjectId() { return projectId; }
    public Long getAssignedToId() { return assignedToId; } // ✅ Getter

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }
    public void setPriority(String priority) { this.priority = priority; }
    public void setStatus(String status) { this.status = status; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
    public void setAssignedToId(Long assignedToId) { this.assignedToId = assignedToId; } // ✅ Setter
}
