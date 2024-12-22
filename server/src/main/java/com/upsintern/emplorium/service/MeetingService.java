package com.upsintern.emplorium.service;


import com.upsintern.emplorium.dto.MeetingDto;
import com.upsintern.emplorium.entity.Meeting;
import com.upsintern.emplorium.repository.MeetingRepository;
import com.upsintern.emplorium.responsemodel.ResponseBase;
import com.upsintern.emplorium.utils.Mapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@Slf4j
public class MeetingService {
    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    StaffService staffService;

    public String createNewMeeting(MeetingDto meetingDto){
        Meeting meeting= Mapper.meetingMapper(meetingDto);
        String meetingId=meetingRepository.save(meeting).getMeetingId();
        notifyMeetingAll(meeting);
        return meetingId;
    }


    public void notifyMeetingAll(Meeting meeting){
        log.info("notifying users on meeting started");
        StringBuilder sb = new StringBuilder();
        sb.append("Meeting Details:\n")
                .append("-------------------\n")
                .append("Meeting ID: ").append(meeting.getMeetingId()).append("\n")
                .append("Meeting Name: ").append(meeting.getMeetingName()).append("\n")
                .append("Description: ").append(meeting.getMeetingDescription()).append("\n")
                .append("Date and Time: ").append(meeting.getMeetingDateTime()).append("\n")
                .append("Meeting Link: ").append(meeting.getMeetingLink()).append("\n")
                .append("Owner: ").append(meeting.getMeetingOwner()).append("\n")
                .append("Participants: ").append(String.join(", ", meeting.getEmpIdList())).append("\n")
                .append("\nPlease make sure to attend on time.\n");
        staffService.sendNotificationsToStaffs(meeting.getEmpIdList(), sb.toString(), meeting.getMeetingName());
        log.info("notifying users on meeting ended");
    }
    @Transactional
    public void deleteExpiredMeetings(){
        meetingRepository.deleteMeetingByMeetingDateTimeBefore(Timestamp.from(Instant.now()));
    }

    public ResponseBase cancelMeeting(String meetingId){
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(() -> new RuntimeException(""));
        meeting.setMeetingStatus(Meeting.MeetingStatus.CANCELLED);
        meetingRepository.save(meeting);
        return new ResponseBase("Meeting cancelled",true);
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