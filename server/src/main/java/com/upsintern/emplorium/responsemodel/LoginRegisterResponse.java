package com.upsintern.emplorium.responsemodel;

import com.upsintern.emplorium.entity.Staff;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginRegisterResponse{
    String msg;
    boolean status;
    Staff.StaffRole role;
}
