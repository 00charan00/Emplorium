package com.upsintern.emplorium.controller;

import com.upsintern.emplorium.entity.Staff;
import com.upsintern.emplorium.responsemodel.LoginRegisterResponse;
import com.upsintern.emplorium.responsemodel.ResponseBase;
import com.upsintern.emplorium.dto.StaffDto;
import com.upsintern.emplorium.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("staff")
@CrossOrigin
public class StaffController {

    @Autowired
    StaffService staffService;

    @PostMapping("add")
    public ResponseEntity<LoginRegisterResponse> addNewStaff(@RequestBody StaffDto staffDto){
        return ResponseEntity.ok(staffService.saveNewStaff(staffDto));
    }

    @GetMapping("all")
    public ResponseEntity<List<Staff>> getAllStaff(){
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    @PutMapping("update")
    public ResponseEntity<ResponseBase> updateStaff(@RequestParam String staffId, @RequestBody StaffDto staffDto){
        ResponseBase response = new ResponseBase(staffService.updateStaff(staffId,staffDto),true);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("del")
    public ResponseEntity<ResponseBase> deleteStaff(@RequestParam String staffId){
        ResponseBase response = new ResponseBase(staffService.deleteStaff(staffId),true);
        return ResponseEntity.ok(response);
    }

    @PostMapping("login")
    public ResponseEntity<LoginRegisterResponse> staffLogin(@RequestBody StaffDto staffDto){
        return ResponseEntity.ok(staffService.staffLogin(staffDto));
    }
}
