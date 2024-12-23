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
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-task-detail-view',
  imports: [
    MatProgressSpinner,
    DatePipe,
    MatButton
  ],
  templateUrl: './task-detail-view.component.html'
})
export class TaskDetailViewComponent implements OnInit{

  staffTask!: StaffTask;
  isAdmin:boolean = false;
  isTL:boolean = false;

  constructor(private route:ActivatedRoute, private taskService:TaskService,private matDialog:MatDialog,private authService:AuthService) {
    this.isAdmin = this.authService.isAdministrator();
    this.isTL = this.authService.isTL();
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



  approveOrReject(taskId:string,progressInfoId:string,resultStatus: string) {
    this.taskService.approveOrRejectModule(taskId,progressInfoId,resultStatus)
      .subscribe(res => {
        console.log(res);
      })
  }

  adminApprove(taskId:string) {
    this.taskService.adminApprove(taskId)
      .subscribe(res => {
        console.log(res);
      })
  }

    protected readonly localStorage = localStorage;
}
