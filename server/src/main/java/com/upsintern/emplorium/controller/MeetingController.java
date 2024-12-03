package com.upsintern.emplorium.controller;


import com.upsintern.emplorium.dto.MeetingDto;
import com.upsintern.emplorium.responsemodel.ResponseBase;
import com.upsintern.emplorium.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("meet")
public class MeetingController {

    @Autowired
    MeetingService meetingService;

    @PostMapping("create")
    public ResponseEntity<ResponseBase> createMeeting(@RequestBody MeetingDto meetingDto){
        ResponseBase response = new ResponseBase(meetingService.createNewMeeting(meetingDto), true);
        return ResponseEntity.ok(response);
    }

    @PostMapping("cancel")
    public ResponseEntity<ResponseBase> cancelMeeting(@RequestParam String meetingId){
        ResponseBase responseBase = new ResponseBase(meetingService.cancelMeeting(meetingId), true);
        return ResponseEntity.ok(responseBase);
    }
}
