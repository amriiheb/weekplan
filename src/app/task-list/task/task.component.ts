import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    @Input()   tasktitle :string ;
    @Input()   taskdescription : string ;
    @Input()   taskresponsible :string;
    @Input()   taskState :string;
    @Input()   index;
    constructor() { }

  ngOnInit() {
  }




}
