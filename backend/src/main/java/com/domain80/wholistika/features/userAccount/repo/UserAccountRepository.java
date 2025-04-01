package com.domain80.wholistika.features.userAccount.repo;

import com.domain80.wholistika.features.userAccount.models.UserAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
    Optional<UserAccount> findByEmail(String email);
    Optional<UserAccount> findByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String email);


    @Query("SELECT u FROM UserAccount u WHERE " +
            "(:query IS NULL OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.interests) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.about) LIKE LOWER(CONCAT('%', :query, '%'))) AND" +
            "(:role IS NULL OR u.role = com.domain80.wholistika.features.userAccount.models.UserRole.valueOf(:role)) AND " +
            "(:createdAfter IS NULL OR u.createdAt >= :createdAfter) AND " +
            "(:createdBefore IS NULL OR u.createdAt <= :createdBefore)")
    Page<UserAccount> searchByFilters(
            @Param("query") String query,
            @Param("role") String role,
            @Param("createdAfter") LocalDate createdAfter,
            @Param("createdBefore") LocalDate createdBefore,
            Pageable pageable
    );
}
