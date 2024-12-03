package com.upsintern.emplorium.repository;


import com.upsintern.emplorium.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff,String> {
    Staff findByStaffEmail(String username);

    boolean existsByStaffEmail(String mail);
}
