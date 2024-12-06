package com.upsintern.emplorium.service;

import com.upsintern.emplorium.dto.TeamDto;
import com.upsintern.emplorium.entity.Staff;
import com.upsintern.emplorium.entity.Team;
import com.upsintern.emplorium.exception.DataNotFoundException;
import com.upsintern.emplorium.exception.InvalidDataException;
import com.upsintern.emplorium.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class TeamService {

    @Autowired
    TeamRepository teamRepository;
    @Autowired
    StaffService staffService;

    public String createTeam(TeamDto teamDto) {
        return formTeam(teamDto).getTeamId();
    }

    public String deleteTeam(String teamId) {
        teamRepository.deleteById(teamId);
        return "Team Deleted";
    }

    public Team formTeam(TeamDto teamDto) {
        List<Staff> members = staffService.getStaffsByIds(teamDto.getTeamMembers());
        Staff leader = staffService.getStaffById(teamDto.getTeamLeader());
        if(members != null && leader != null){
            return teamRepository.save(new Team("Team"+ UUID.randomUUID(),teamDto.getTeamName(),members,leader));
        }else throw new InvalidDataException("Please provide team member and leader details");
    }

    public Team getTeamById(String teamId) {
        return teamRepository.findById(teamId).orElseThrow(() -> new DataNotFoundException("No such Team found with id : "+teamId));
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }
}
