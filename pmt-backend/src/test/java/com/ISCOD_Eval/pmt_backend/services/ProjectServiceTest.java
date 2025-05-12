package com.ISCOD_Eval.pmt_backend.services;

import com.ISCOD_Eval.pmt_backend.models.Project;
import com.ISCOD_Eval.pmt_backend.models.User;
import com.ISCOD_Eval.pmt_backend.repositories.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @Test
    void getAllProjectsTest() {
        User owner = new User("John Doe", "john@example.com", "password"); // ✅ Ensure owner is set

        Project project1 = new Project("Project A", "Description A", "2024-06-01", owner);
        Project project2 = new Project("Project B", "Description B", "2024-06-02", owner);

        when(projectRepository.findAll()).thenReturn(Arrays.asList(project1, project2));

        List<Project> projects = projectService.getAllProjects();
        assertEquals(2, projects.size());
    }

}
