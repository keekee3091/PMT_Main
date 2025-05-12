package com.ISCOD_Eval.pmt_backend.controllers;

import java.util.List;

public class ProjectRequest {
    private String name;
    private String description;
    private String startDate;
    private Long ownerId;
    private List<MemberRequest> members;

    // Constructors
    public ProjectRequest() {}

    public ProjectRequest(String name, String description, String startDate, Long ownerId, List<MemberRequest> members) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.ownerId = ownerId;
        this.members = members;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getStartDate() {
        return startDate;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public List<MemberRequest> getMembers() {
        return members;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public void setMembers(List<MemberRequest> members) {
        this.members = members;
    }

    // Nested MemberRequest class
    public static class MemberRequest {
        private Long userId;
        private String role;  // Admin, Member, or Observer

        // Constructor
        public MemberRequest(Long userId, String role) {
            this.userId = userId;
            this.role = role;
        }

        // Getters and Setters
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
