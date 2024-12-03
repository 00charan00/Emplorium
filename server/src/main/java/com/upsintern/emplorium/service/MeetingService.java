package com.upsintern.emplorium.service;


import com.upsintern.emplorium.dto.MeetingDto;
import com.upsintern.emplorium.entity.Meeting;
import com.upsintern.emplorium.repository.MeetingRepository;
import com.upsintern.emplorium.utils.Mapper;
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

    public void deleteExpiredMeetings(){
        meetingRepository.deleteMeetingByMeetingDateTimeLessThan(Timestamp.from(Instant.now()));
    }

    public String cancelMeeting(String meetingId){
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(() -> new RuntimeException(""));
        meeting.setMeetingStatus(Meeting.MeetingStatus.CANCELLED);
        meetingRepository.save(meeting);
        return "Meeting cancelled";
    }
    //only staff id is shown alter it to show staff name also
    public List<Meeting> getActiveMeetings() {
        return meetingRepository.findAllByMeetingStatus(Meeting.MeetingStatus.ACTIVE);
    }
}
