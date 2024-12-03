package com.upsintern.emplorium.scheduler;

import com.upsintern.emplorium.service.MeetingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class MeetingScheduler {

    @Autowired
    MeetingService meetingService;

    @Scheduled(fixedRate = 60000)
    public void autoDeleteExpiredMeeting(){
        log.info("meeting scheduler triggerred");
        meetingService.deleteExpiredMeetings();
    }
}
