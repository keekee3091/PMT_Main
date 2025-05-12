package com.ISCOD_Eval.pmt_backend.repositories;

import com.ISCOD_Eval.pmt_backend.models.Task;
import com.ISCOD_Eval.pmt_backend.models.TaskHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskHistoryRepository extends JpaRepository<TaskHistory, Long> {
    List<TaskHistory> findByTask(Task task);
}
