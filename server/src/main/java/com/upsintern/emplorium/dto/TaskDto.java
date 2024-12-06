package com.upsintern.emplorium.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    String taskTittle;
    String taskDescription;
    List<String> modules;
    List<String> teamMembers;
    String teamLeader;
    String teamName;
}
