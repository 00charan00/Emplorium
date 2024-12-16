package com.upsintern.emplorium.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Team {
    @Id
    String teamId;
    String teamName;
    @ManyToMany
    List<Staff> teamMembers;
    @ManyToOne
    Staff teamLeader;
}