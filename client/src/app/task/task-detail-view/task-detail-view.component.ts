import {Component,OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProgressStatus, StaffTask} from '../../model/staff-task';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../service/task.service';
import {UpdateProgressComponent} from '../update-progress/update-progress.component';
import {PicViewComponent} from '../pic-view/pic-view.component';
import {AuthService} from '../../service/auth.service';


@Component({
  selector: 'app-task-detail-view',
  imports: [
    MatProgressSpinner,
    DatePipe
  ],
  templateUrl: './task-detail-view.component.html'
})
export class TaskDetailViewComponent implements OnInit{

  staffTask!: StaffTask;
  isAdmin:boolean = false;

  constructor(private route:ActivatedRoute, private taskService:TaskService,private matDialog:MatDialog,private authService:AuthService) {

  }

  ngOnInit(): void {
    let staffId = this.route.snapshot.paramMap.get('staffId');
    if(staffId != null) {
      this.taskService.getTaskById(staffId)
        .subscribe(res => {
          this.staffTask = res;
        })
    }else{
      console.log('no data..');
    }
    this.isAdmin = this.authService.isAdministrator();

  }

  protected readonly ProgressStatus = ProgressStatus;

  newProgressUpdate() {
    this.matDialog.open(UpdateProgressComponent,{
      data:{taskDet:this.staffTask}
    });
  }

  getPicImg(imgDet:any) {
    return 'data:image/jpeg;base64,'+imgDet;
  }


  openPicView(image: any) {
    this.matDialog.open(PicViewComponent,{
      data:{picDet:this.getPicImg(image)}
    });
  }

  approveTask() {
    this.taskService.approveTask(this.staffTask.taskId)
      .subscribe(res => {
        console.log(res);
      });
  }


  approveOrReject(progressInfoId:string,resultStatus: string) {
    this.taskService.approveOrRejectModule(progressInfoId,resultStatus)
      .subscribe(res => {
        console.log(res);
      })
  }
}