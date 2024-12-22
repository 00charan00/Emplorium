package com.upsintern.emplorium.repository;


import com.upsintern.emplorium.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface EventRepository extends JpaRepository<Event,String> {

    void deleteAllByEventDateBefore(Date date);

}
