package com.upsintern.emplorium.utils;

import com.upsintern.emplorium.dto.EventDto;
import com.upsintern.emplorium.dto.MeetingDto;
import com.upsintern.emplorium.dto.StaffDto;
import com.upsintern.emplorium.entity.Event;
import com.upsintern.emplorium.entity.Meeting;
import com.upsintern.emplorium.entity.Staff;
import java.util.UUID;

public class Mapper {

    public static Staff staffMapper(StaffDto staffDto){
        return new Staff(
                "Staff:"+UUID.randomUUID(),
                staffDto.getStaffName(),
                staffDto.getStaffEmail(),
                staffDto.getStaffPass(),
                Staff.StaffRole.ROLE_EMPLOYEE
        );
    }

    public static Event eventMapper(EventDto eventDto ){
        return new Event(
                "Event:"+ UUID.randomUUID(),
                eventDto.getEventName(),
                eventDto.getEventVenue(),
                eventDto.getEventDate(),
                eventDto.getEventDescription()
        );
    }

    public static Meeting meetingMapper(MeetingDto meetingDto){
        return new Meeting(
                "Meeting:"+UUID.randomUUID(),
                meetingDto.getMeetingName(),
                meetingDto.getMeetingDescription(),
                meetingDto.getEmpIdList(),
                meetingDto.getMeetingDateTime(),
                meetingDto.getMeetingOwner(),
                Meeting.MeetingStatus.ACTIVE,
                meetingDto.getMeetingLink()
        );
    }
}
