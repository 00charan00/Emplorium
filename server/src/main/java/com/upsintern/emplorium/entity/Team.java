package com.upsintern.emplorium.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
    @OneToMany
    List<Staff> teamMembers;
    @OneToOne
    Staff teamLeader;
}
