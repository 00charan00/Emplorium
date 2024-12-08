package com.upsintern.emplorium.service;


import com.upsintern.emplorium.dto.TaskDto;
import com.upsintern.emplorium.dto.TeamDto;
import com.upsintern.emplorium.entity.ImageDetail;
import com.upsintern.emplorium.entity.ProgressInfo;
import com.upsintern.emplorium.entity.Task;
import com.upsintern.emplorium.entity.Team;
import com.upsintern.emplorium.exception.InvalidDataException;
import com.upsintern.emplorium.repository.ImageDetailRepository;
import com.upsintern.emplorium.repository.ProgressInfoRepository;
import com.upsintern.emplorium.repository.TaskRepository;
import com.upsintern.emplorium.responsemodel.ResponseBase;
import com.upsintern.emplorium.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;
    @Autowired
    TeamService teamService;
    ProgressInfoRepository progressInfoRepository;
    @Autowired
    ImageDetailRepository imageDetailRepository;

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


        public ResponseEntity<ResponseBase> updateModuleProgress(String taskId, String moduleName, Task.ProgressStatus progressStatus, MultipartFile[] referencePics, String comment){
            Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("No such Task found"));
            Map<String,Task.ProgressStatus> moduleProgress = task.getModuleLevelProgress();
            if(moduleProgress != null && moduleProgress.containsKey(moduleName)){
                double modulesSize = moduleProgress.size();
                double perPercentage = 100;
                moduleProgress.put(moduleName,progressStatus);
                task.setProgressPercent(task.getProgressPercent() + perPercentage);

                try {
                    ProgressInfo progressInfo = extractProgressInfo(referencePics, comment);
                    Set<ProgressInfo> preProgressInfo = task.getProgressDetails();
                    if(preProgressInfo == null){
                        Set<ProgressInfo> progressInfoSet = new HashSet<>();
                        progressInfoSet.add(progressInfo);
                        task.setProgressDetails(progressInfoSet);
                    }else{
                        preProgressInfo.add(progressInfo);
                        task.setProgressDetails(preProgressInfo);
                    }

                }catch (Exception e){
                    throw new InvalidDataException("Invalid References");
                }

                taskRepository.save(task);
            }

            return ResponseEntity.ok(new ResponseBase("Task Progress updated",true));
        }

        private ProgressInfo extractProgressInfo(MultipartFile[] referencePics, String comment) throws IOException {
            ProgressInfo progressInfo = new ProgressInfo();
            List<ImageDetail> imageDetails = new ArrayList<>();
            for(MultipartFile multipart : referencePics){
                byte[] pic = ImageUtils.compressImage(multipart.getBytes());
                ImageDetail imgDetail = new ImageDetail(
                        "Pic:"+UUID.randomUUID(),
                        multipart.getName(),
                        pic
                );
                imageDetailRepository.save(imgDetail);
                imageDetails.add(imgDetail);

            }
            progressInfo.setProgressInfoId("ProInfo:"+UUID.randomUUID());
            progressInfo.setComment(comment);
            progressInfo.setReferences(imageDetails);
            progressInfoRepository.save(progressInfo);
            return progressInfo;
        }

    public ResponseEntity<ResponseBase> updateTaskCompletionOrApproval(String taskId, Task.ProgressStatus progressStatus){
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("No such Task found"));
        task.setTaskProgress(progressStatus);
        task.setProgressPercent(100);
        taskRepository.save(task);
        return ResponseEntity.ok(new ResponseBase("Task Progress updated",true));
    }

}
