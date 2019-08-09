import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { Task } from 'src/models/task.model';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
taskForm: FormGroup;
fileIsUploading = false;
fileUrl: string;
fileUploaded = false;
  constructor(private formBuilder: FormBuilder, private TasksService: TasksService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      responsible:'',
      description: '',
      state :'started'
    });
  }
  
  onSaveTask() {
    const title = this.taskForm.get('title').value;
    const responsible = this.taskForm.get('responsible').value;
    const description = this.taskForm.get('description').value;
    const state=this.taskForm.get('state').value;
    const id=Math.floor(Math.random() * 101);
    const newTask = new Task(title, responsible,state);
    newTask.description = description;
    if(this.fileUrl && this.fileUrl !== '') {
      newTask.photo = this.fileUrl;
    }
    this.TasksService.createNewTask(newTask);
    this.router.navigate(['/tasks/all']);
}
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.TasksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
}
detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}
onCancel(){
  this.router.navigate(['/tasks/all']);

}

}
