package com.upsintern.emplorium.scheduler;

import com.upsintern.emplorium.service.EventService;
import com.upsintern.emplorium.service.MeetingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class ApplicationScheduler {

    @Autowired
    MeetingService meetingService;

    @Autowired
    EventService eventService;

    @Scheduled(fixedRate = 1000*60*60)
    public void autoDeleteExpiredMeeting(){
        log.info("Meeting Scheduler Triggered - Every One Hour");
        meetingService.deleteExpiredMeetings();
    }

    @Scheduled(fixedRate = 1000*60*60)
    public void autoDeleteExpiredEvents(){
        log.info("Event Scheduler Triggered - Every One Hour");
        eventService.deleteExpiredEvents();
    }
}
