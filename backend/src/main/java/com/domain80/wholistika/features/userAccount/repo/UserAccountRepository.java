package com.domain80.wholistika.features.userAccount.repo;

import com.domain80.wholistika.features.userAccount.models.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
    Optional<UserAccount> findByEmail(String email);
    Optional<UserAccount> findByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String email);
}
