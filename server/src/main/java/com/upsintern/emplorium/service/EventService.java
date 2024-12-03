package com.upsintern.emplorium.service;

import com.upsintern.emplorium.dto.EventDto;
import com.upsintern.emplorium.entity.Event;
import com.upsintern.emplorium.repository.EventRepository;
import com.upsintern.emplorium.utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    public String saveNewEvent(EventDto eventDto){
        Event event= Mapper.eventMapper(eventDto);
        return eventRepository.save(event).getEventId();
    }

    public List<Event> getAllEvent(){
        return eventRepository.findAll();
    }
}
