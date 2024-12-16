import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StaffTask} from '../../model/staff-task';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {TaskService} from '../../service/task.service';

@Component({
  selector: 'app-update-progress',
  imports: [
    FormsModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule
  ],
  templateUrl: './update-progress.component.html'
})
export class UpdateProgressComponent {

  taskDetails!:StaffTask;
  refImageList!:FileList;


  progressStatusList = ['INITIATED', 'IN_PROGRESS', 'DONE'];

  taskProgressDetails = new FormGroup({
    module:new FormControl(''),
    progress:new FormControl(''),
    comment:new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA)public taskData:{taskDet:StaffTask}, private taskService:TaskService) {
    this.taskDetails = this.taskData.taskDet;
  }

  onSelectImages(event:any ){
    if(this.refImageList == null)
    this.refImageList = event.target.files;
    console.log(this.refImageList);
  }

  updateTaskProgressToServer(){
    let moduleSelected = this.taskProgressDetails.controls.module.value;
    let progStatus = this.taskProgressDetails.controls.progress.value;
    let comment = this.taskProgressDetails.controls.comment.value;
    if(moduleSelected != null && moduleSelected != '' && progStatus != null && progStatus != '' && comment != null && comment != ''){
      this.taskService.updateModuleLevelProgress(
        this.taskDetails.taskId,
        moduleSelected,
        progStatus,
        this.refImageList,
        comment
      ).subscribe(res => {
        console.log(res);
      })
    }else {
      console.log('fill all details');
    }

  }

}
