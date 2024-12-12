package com.upsintern.emplorium.service;


import com.upsintern.emplorium.dto.MeetingDto;
import com.upsintern.emplorium.entity.Meeting;
import com.upsintern.emplorium.repository.MeetingRepository;
import com.upsintern.emplorium.utils.Mapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class MeetingService {
    @Autowired
    MeetingRepository meetingRepository;

    public String createNewMeeting(MeetingDto meetingDto){
        Meeting meeting= Mapper.meetingMapper(meetingDto);
        String meetingId=meetingRepository.save(meeting).getMeetingId();
        notifyMeetingAll(meeting);
        return meetingId;
    }
    private void notifyMeetingAll(Meeting meeting){
    }
    @Transactional
    public void deleteExpiredMeetings(){
        meetingRepository.deleteMeetingByMeetingDateTimeBefore(Timestamp.from(Instant.now()));
    }

    public String cancelMeeting(String meetingId){
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(() -> new RuntimeException(""));
        meeting.setMeetingStatus(Meeting.MeetingStatus.CANCELLED);
        meetingRepository.save(meeting);
        return "Meeting cancelled";
    }
    public List<Meeting> getActiveMeetings() {
        return meetingRepository.findAllByMeetingStatus(Meeting.MeetingStatus.ACTIVE);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public List<Meeting> getMyMeetings(String staffId,String staffEmail){
        return meetingRepository.findAll().stream().filter(
                m -> m.getEmpIdList().contains(staffId) ||
                        m.getMeetingOwner().equals(staffEmail)
                )
                .toList();
    }
}
