package com.upsintern.emplorium;

import com.upsintern.emplorium.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class EmploriumApplication implements CommandLineRunner {

    @Autowired
    StaffService staffService;


    public static void main(String[] args) {
        SpringApplication.run(EmploriumApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        staffService.createAdminAccount();
    }

}
