package com.upsintern.emplorium.repository;

import com.upsintern.emplorium.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting,String> {

    void deleteMeetingByMeetingDateTimeLessThan(Timestamp date);
}
