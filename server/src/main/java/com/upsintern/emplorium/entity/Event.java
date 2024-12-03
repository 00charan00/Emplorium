package com.upsintern.emplorium.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Event {
    @Id
    String eventId;
    String eventName;
    String eventVenue;
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm a")
    private Date eventDate;
    String eventDescription;
}
