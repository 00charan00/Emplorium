package com.upsintern.emplorium.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Value("${spring.mail.username}")
    private String userDetail;

    @Autowired
    JavaMailSender javaMailSender;

    public void sendEmail(String toUser,String subject, String body){
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(userDetail);
            simpleMailMessage.setTo(toUser);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(body);
            javaMailSender.send(simpleMailMessage);
        }catch (Exception e){
            throw new RuntimeException("Issues in sending Mail!");
        }
    }
}
