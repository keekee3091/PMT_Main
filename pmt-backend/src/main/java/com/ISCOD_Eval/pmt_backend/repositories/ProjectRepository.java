package com.ISCOD_Eval.pmt_backend.repositories;

import com.ISCOD_Eval.pmt_backend.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByName(String name); // ✅ Ensures only one result
}
