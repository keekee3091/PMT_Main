package com.ISCOD_Eval.pmt_backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import com.ISCOD_Eval.pmt_backend.models.Project;
import com.ISCOD_Eval.pmt_backend.models.ProjectMember;
import com.ISCOD_Eval.pmt_backend.models.User;


public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    List<ProjectMember> findByProject(Project project);
    Optional<ProjectMember> findByProjectAndUser(Project project, User user);
}

