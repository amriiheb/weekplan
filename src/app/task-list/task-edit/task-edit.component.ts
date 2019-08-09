import { Component, OnInit, Input } from '@angular/core';
import { state } from '@angular/animations';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/models/task.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
OLDtitle  = this.route.snapshot.params['title'];
 OLDresponsible=this.route.snapshot.params['responsible'];
 OLDstate=this.route.snapshot.params['state'];
 OLDdescription=this.route.snapshot.params['description'];
  taskForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private TasksService: TasksService,
    private router: Router,private route: ActivatedRoute) { 
      this.initForm()
    }

  ngOnInit() {
  }
 initForm() {
    this.taskForm = this.formBuilder.group({
      title: [this.OLDtitle+'', Validators.required],
      responsible:this.OLDresponsible+'',
      description: this.OLDdescription+'',
      state :this.OLDstate+'',
    });
  }
  
  onSaveTask() {
    const oldtask=new Task(this.OLDtitle,this.OLDresponsible,this.OLDstate) ;
    const title = this.taskForm.get('title').value;
    const responsible = this.taskForm.get('responsible').value;
    const description = this.taskForm.get('description').value;
    const state=this.taskForm.get('state').value;
    const newTask = new Task(title, responsible,state);
    newTask.description = description;
    if(this.fileUrl && this.fileUrl !== '') {
      newTask.photo = this.fileUrl;
    }
    this.TasksService.editTask(newTask,oldtask);
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
