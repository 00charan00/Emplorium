package com.upsintern.emplorium.repository;

import com.upsintern.emplorium.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,String> {
    List<Task> findAllByTaskProgress(Task.ProgressStatus progressStatus);
}