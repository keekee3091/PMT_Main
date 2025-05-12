package com.ISCOD_Eval.pmt_backend.controllers;

import com.ISCOD_Eval.pmt_backend.models.*;

import com.ISCOD_Eval.pmt_backend.repositories.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final TaskHistoryRepository taskHistoryRepository;

    public ProjectController(
            ProjectRepository projectRepository,
            UserRepository userRepository,
            TaskRepository taskRepository,
            ProjectMemberRepository projectMemberRepository,
            TaskHistoryRepository taskHistoryRepository
    ) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.projectMemberRepository = projectMemberRepository;
        this.taskHistoryRepository = taskHistoryRepository;

    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        return project.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectRequest request) {
        Optional<User> owner = userRepository.findById(request.getOwnerId());
        if (owner.isEmpty()) {
            return ResponseEntity.badRequest().body("Owner not found with ID: " + request.getOwnerId());
        }

        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStartDate(request.getStartDate());
        project.setOwner(owner.get());

        // Handle members and roles
        List<ProjectMember> projectMembers = new ArrayList<>();
        for (ProjectRequest.MemberRequest memberRequest : request.getMembers()) {
            Optional<User> member = userRepository.findById(memberRequest.getUserId());
            if (member.isPresent()) {
                ProjectMember projectMember = new ProjectMember();
                projectMember.setProject(project);
                projectMember.setUser(member.get());
                projectMember.setRole(ProjectMember.Role.valueOf(memberRequest.getRole()));
                projectMembers.add(projectMember);
            }
        }

        project.setMembers(projectMembers);
        projectRepository.save(project);

        return ResponseEntity.ok(project);
    }


    @GetMapping("/{id}/task-history")
    public ResponseEntity<List<TaskHistory>> getTaskHistoryByProject(@PathVariable Long id) {
        Optional<Project> projectOpt = projectRepository.findById(id);
        if (projectOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Project project = projectOpt.get();
        List<Task> tasks = taskRepository.findByProject(project);

        List<TaskHistory> historyList = new ArrayList<>();
        for (Task task : tasks) {
            historyList.addAll(taskHistoryRepository.findByTask(task));
        }

        return ResponseEntity.ok(historyList);
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<?> inviteMember(@PathVariable Long id, @RequestParam String email, @RequestParam ProjectMember.Role role) {
        Optional<Project> project = projectRepository.findById(id);
        Optional<User> user = userRepository.findByEmail(email);

        if (project.isEmpty() || user.isEmpty()) {
            return ResponseEntity.badRequest().body("Projet ou utilisateur introuvable");
        }

        ProjectMember pm = new ProjectMember();
        pm.setProject(project.get());
        pm.setUser(user.get());
        pm.setRole(role);

        projectMemberRepository.save(pm);
        return ResponseEntity.ok("Utilisateur ajouté au projet");
    }

    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<Task>> getTasksByProjectId(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Task> tasks = taskRepository.findByProject(project.get());
        return ResponseEntity.ok(tasks);
    }
    @GetMapping("/{id}/members")
    public ResponseEntity<List<ProjectMember>> getProjectMembers(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<ProjectMember> members = projectMemberRepository.findByProject(project.get());
        return ResponseEntity.ok(members);
    }

}
