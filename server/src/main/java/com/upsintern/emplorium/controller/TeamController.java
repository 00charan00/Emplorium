package com.upsintern.emplorium.controller;


import com.upsintern.emplorium.dto.TeamDto;
import com.upsintern.emplorium.entity.Team;
import com.upsintern.emplorium.responsemodel.ResponseBase;
import com.upsintern.emplorium.service.TeamService;
import jakarta.servlet.ServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("team")
public class TeamController {

    @Autowired
    TeamService teamService;

    @PostMapping("create")
    public ResponseEntity<ResponseBase> createTeam(@RequestBody TeamDto teamDto){
        ResponseBase response = new ResponseBase(teamService.createTeam(teamDto),true);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete/{teamId}")
    public ResponseEntity<ResponseBase> deleteTeam(@PathVariable String teamId){
        ResponseBase response = new ResponseBase(teamService.deleteTeam(teamId),true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("all")
    public ResponseEntity<List<Team>> getAllTeams(){
        return ResponseEntity.ok(teamService.getAllTeams());
    }

    @GetMapping("tm/{teamId}")
    public ResponseEntity<Team> getTeam(String teamId){
        return ResponseEntity.ok(teamService.getTeamById(teamId));
    }

}
