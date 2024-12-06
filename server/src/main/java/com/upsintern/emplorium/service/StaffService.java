package com.upsintern.emplorium.service;

import com.upsintern.emplorium.dto.StaffDto;
import com.upsintern.emplorium.entity.Staff;
import com.upsintern.emplorium.exception.InvalidDataException;
import com.upsintern.emplorium.exception.StaffNotFoundException;
import com.upsintern.emplorium.repository.StaffRepository;
import com.upsintern.emplorium.responsemodel.LoginRegisterResponse;
import com.upsintern.emplorium.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class StaffService {

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public LoginRegisterResponse saveNewStaff(StaffDto staffDto){
        Staff staff = Mapper.staffMapper(staffDto);
        staff.setStaffPass(passwordEncoder.encode(staff.getStaffPass()));
        Staff savedStaff = staffRepository.save(staff);
        return new LoginRegisterResponse(
                savedStaff.getStaffId(),
                true,
                Staff.StaffRole.ROLE_EMPLOYEE,
                savedStaff.getStaffName()
        );
    }

    public String deleteStaff(String staffId){
        staffRepository.deleteById(staffId);
        return "Staff Removed";
    }

    public String updateStaff(String staffId, StaffDto staffDto){
        Staff staff = staffRepository.findById(staffId).orElseThrow(() -> new StaffNotFoundException("No Staff Found with Id: "+staffId));
        String tempVal = staffDto.getStaffEmail();
        if(tempVal != null && !tempVal.isEmpty()){
            staff.setStaffEmail(tempVal);
        }
        tempVal = staffDto.getStaffName();
        if(tempVal != null && !tempVal.isEmpty()){
            staff.setStaffName(tempVal);
        }
        tempVal = staffDto.getStaffPass();
        if(tempVal != null && !tempVal.isEmpty()){
            staff.setStaffPass(tempVal);
        }
        staffRepository.save(staff);
        return "Staff data updated";
    }

    public LoginRegisterResponse staffLogin(StaffDto staffDto){
        String mail = staffDto.getStaffEmail();
        String pass = staffDto.getStaffPass();
        if(mail != null && !mail.isEmpty() && pass != null && !pass.isEmpty()){
            boolean isExist = staffRepository.existsByStaffEmail(mail);
            if(!isExist) throw new StaffNotFoundException("no staff with email id : "+mail);
            Staff staff = staffRepository.findByStaffEmail(mail);
            String actualPass = staff.getStaffPass();
            boolean isValidPass = passwordEncoder.matches(pass, actualPass);
            if(isValidPass){
                return new LoginRegisterResponse(staff.getStaffId(),true,staff.getStaffRole(), staff.getStaffName());
            }
            else throw new InvalidDataException("Incorrect password");
        }else throw new InvalidDataException("Provide Proper details");
    }

}
