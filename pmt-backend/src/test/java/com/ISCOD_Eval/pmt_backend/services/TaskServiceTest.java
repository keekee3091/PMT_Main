package com.ISCOD_Eval.pmt_backend.services;

import com.ISCOD_Eval.pmt_backend.models.Task;
import com.ISCOD_Eval.pmt_backend.repositories.TaskRepository;
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
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void getAllTasksTest() {
        Task task1 = new Task(null, "Task A", "Description A", "2024-06-01", "High", "TODO", null);
        Task task2 = new Task(null, "Task B", "Description B", "2024-06-02", "Medium", "IN_PROGRESS", null);

        when(taskRepository.findAll()).thenReturn(Arrays.asList(task1, task2));

        List<Task> tasks = taskService.getAllTasks();
        assertEquals(2, tasks.size());
    }
}
