package com.ISCOD_Eval.pmt_backend.repositories;

import com.ISCOD_Eval.pmt_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // ✅ Use Optional to prevent multiple results
}
