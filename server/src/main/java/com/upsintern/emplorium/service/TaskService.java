package com.upsintern.emplorium.service;


import com.upsintern.emplorium.dto.TaskDto;
import com.upsintern.emplorium.dto.TeamDto;
import com.upsintern.emplorium.entity.Task;
import com.upsintern.emplorium.entity.Team;
import com.upsintern.emplorium.repository.TaskRepository;
import com.upsintern.emplorium.responsemodel.ResponseBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;
    @Autowired
    TeamService teamService;

    public ResponseEntity<ResponseBase> createTask(TaskDto taskDto){

        Task task = new Task();
        task.setTaskTittle(taskDto.getTaskTittle());
        task.setTaskDescription(taskDto.getTaskDescription());
        task.setTaskId("Task"+UUID.randomUUID());
        task.setTaskProgress(Task.ProgressStatus.INITIATED);

        List<String> modules = taskDto.getModules();
        if(modules != null){
            Map<String,Task.ProgressStatus> moduleLevelProgress = modules.stream().collect(Collectors.toMap(
                    Function.identity(),
                    m -> Task.ProgressStatus.INITIATED
            ));
            task.setModuleLevelProgress(moduleLevelProgress);
        }
        List<String> teamMembers = taskDto.getTeamMembers();
        String teamLeader = taskDto.getTeamLeader();
        if(teamMembers != null && teamLeader != null){
            Team team = teamService.formTeam(new TeamDto(taskDto.getTeamName(),teamMembers,teamLeader));
            task.setTeam(team);
            task.setTeamAssigned(true);
        }else task.setTeamAssigned(false);

        return ResponseEntity.ok(new ResponseBase(taskRepository.save(task).getTaskId(),true));

    }

    public ResponseEntity<ResponseBase> assignTeam(String taskId,String teamId){
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("No such Task found"));
        Team team = teamService.getTeamById(teamId);
        task.setTeam(team);
        task.setTeamAssigned(true);
        taskRepository.save(task);
        return ResponseEntity.ok(new ResponseBase("Assigned",true));
    }

    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskRepository.findAll());
    }

    public ResponseEntity<Task> getTaskById(String taskId) {
        return ResponseEntity.ok(taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("error")));
    }

    public ResponseEntity<ResponseBase> deleteTask(String taskId) {
        taskRepository.deleteById(taskId);
        return ResponseEntity.ok(new ResponseBase("deleted",true));
    }

    public ResponseEntity<ResponseBase> updateModuleProgress(String taskId, String moduleName,Task.ProgressStatus progressStatus){
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("No such Task found"));
        Map<String,Task.ProgressStatus> moduleProgress = task.getModuleLevelProgress();
        if(moduleProgress != null && moduleProgress.containsKey(moduleName)){
            double modulesSize = moduleProgress.size();
            double perPercentage = 100;
            moduleProgress.put(moduleName,progressStatus);
            task.setProgressPercent(task.getProgressPercent() + perPercentage);
            taskRepository.save(task);
        }
        return ResponseEntity.ok(new ResponseBase("Task Progress updated",true));
    }

    public ResponseEntity<ResponseBase> updateTaskCompletionOrApproval(String taskId, Task.ProgressStatus progressStatus){
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("No such Task found"));
        task.setTaskProgress(progressStatus);
        task.setProgressPercent(100);
        taskRepository.save(task);
        return ResponseEntity.ok(new ResponseBase("Task Progress updated",true));
    }

}
