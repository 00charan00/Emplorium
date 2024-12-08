package com.upsintern.emplorium.repository;

import com.upsintern.emplorium.entity.ProgressInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressInfoRepository extends JpaRepository<ProgressInfo,String> {
}
