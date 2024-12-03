package com.upsintern.emplorium.exception;

public class StaffNotFoundException extends RuntimeException{
    public StaffNotFoundException(String msg){
        super(msg);
    }
}
