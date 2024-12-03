package com.upsintern.emplorium;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling

public class StaffSyncApplication {

    public static void main(String[] args) {
        SpringApplication.run(StaffSyncApplication.class, args);
    }

}
