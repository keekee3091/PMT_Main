package com.ISCOD_Eval.pmt_backend.controllers;

import com.ISCOD_Eval.pmt_backend.models.Project;
import com.ISCOD_Eval.pmt_backend.models.Task;
import com.ISCOD_Eval.pmt_backend.models.User;
import com.ISCOD_Eval.pmt_backend.models.TaskHistory;

import com.ISCOD_Eval.pmt_backend.repositories.ProjectRepository;
import com.ISCOD_Eval.pmt_backend.repositories.TaskRepository;
import com.ISCOD_Eval.pmt_backend.repositories.TaskHistoryRepository;
import com.ISCOD_Eval.pmt_backend.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import com.ISCOD_Eval.pmt_backend.services.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskHistoryRepository taskHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody TaskRequest request) {
        Optional<Project> project = projectRepository.findById(request.getProjectId());

        if (project.isEmpty()) {
            return ResponseEntity.badRequest().body("Projet introuvable");
        }

        User assignedTo = null;
        if (request.getAssignedToId() != null) {
            assignedTo = userRepository.findById(request.getAssignedToId()).orElse(null);
        }

        Task task = new Task(
                request.getTitle(),
                request.getDescription(),
                request.getDueDate(),
                request.getPriority(),
                request.getStatus(),
                project.get()
        );

        task.setAssignedTo(assignedTo);

        Task savedTask = taskRepository.save(task);

        if (assignedTo != null) {
            try {
                emailService.sendTaskAssignedNotification(
                        assignedTo.getEmail(),
                        task.getTitle(),
                        project.get().getOwner().getUsername()
                );
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Erreur lors de l'envoi de l'email: " + e.getMessage());
            }
        }
        return ResponseEntity.ok(savedTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Task existingTask = optionalTask.get();
        User changedBy = existingTask.getProject().getOwner(); // ou récupère l’utilisateur courant si possible
        LocalDateTime now = LocalDateTime.now();

        if (!existingTask.getTitle().equals(updatedTask.getTitle())) {
            recordChange("title", existingTask.getTitle(), updatedTask.getTitle(), existingTask, changedBy, now);
            existingTask.setTitle(updatedTask.getTitle());
        }

        if (!existingTask.getDescription().equals(updatedTask.getDescription())) {
            recordChange("description", existingTask.getDescription(), updatedTask.getDescription(), existingTask, changedBy, now);
            existingTask.setDescription(updatedTask.getDescription());
        }

        if (!existingTask.getDueDate().equals(updatedTask.getDueDate())) {
            recordChange("dueDate", existingTask.getDueDate(), updatedTask.getDueDate(), existingTask, changedBy, now);
            existingTask.setDueDate(updatedTask.getDueDate());
        }

        if (!existingTask.getPriority().equals(updatedTask.getPriority())) {
            recordChange("priority", existingTask.getPriority(), updatedTask.getPriority(), existingTask, changedBy, now);
            existingTask.setPriority(updatedTask.getPriority());
        }

        if (!existingTask.getStatus().equals(updatedTask.getStatus())) {
            recordChange("status", existingTask.getStatus(), updatedTask.getStatus(), existingTask, changedBy, now);
            existingTask.setStatus(updatedTask.getStatus());
        }

        if (updatedTask.getAssignedTo() != null && (
                existingTask.getAssignedTo() == null || !existingTask.getAssignedTo().getId().equals(updatedTask.getAssignedTo().getId()))) {
            String oldUser = existingTask.getAssignedTo() != null ? existingTask.getAssignedTo().getUsername() : "Aucun";
            String newUser = updatedTask.getAssignedTo().getUsername();
            recordChange("assignedTo", oldUser, newUser, existingTask, changedBy, now);
            existingTask.setAssignedTo(updatedTask.getAssignedTo());

            User assignedUser = updatedTask.getAssignedTo();
            try {
                emailService.sendTaskAssignedNotification(
                        assignedUser.getEmail(),
                        updatedTask.getTitle(),
                        changedBy.getUsername()
                );
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Erreur lors de l'envoi de l'email");
            }
        }

        Task saved = taskRepository.save(existingTask);
        return ResponseEntity.ok(saved);
    }

    private void recordChange(String field, String oldVal, String newVal, Task task, User changedBy, LocalDateTime now) {
        TaskHistory history = new TaskHistory();
        history.setTask(task);
        history.setChangedBy(changedBy);
        history.setFieldChanged(field);
        history.setOldValue(oldVal);
        history.setNewValue(newVal);
        history.setChangedAt(now);

        taskHistoryRepository.save(history);
    }

}
