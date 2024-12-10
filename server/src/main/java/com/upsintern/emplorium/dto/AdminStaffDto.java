package com.upsintern.emplorium.dto;

import com.upsintern.emplorium.entity.Staff;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminStaffDto {
    String staffName;
    String staffEmail;
    String staffPass;
    Staff.StaffRole staffRole;
}
