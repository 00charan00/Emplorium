import {Component, Inject, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-pic-view',
  imports: [
    MatCard
  ],
  templateUrl: './pic-view.component.html',
  styleUrl: './pic-view.component.css'
})
export class PicViewComponent implements OnInit{

  pic!:string;

  constructor(@Inject(MAT_DIALOG_DATA)public data:{picDet:string}) {
  }

  ngOnInit(): void {
    this.pic = this.data.picDet;
  }



}
