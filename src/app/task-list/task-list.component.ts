import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/models/task.model';
import { Subscription } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  tasksSubscription: Subscription;
   @Input() statePage :string ;
  constructor(private taskService: TasksService, private router: Router) {}

  ngOnInit() {
    this.tasksSubscription = this.taskService.tasksSubject.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
    this.taskService.emitTasks() ;
  }

  onNewTask() {
    this.router.navigate(['/tasks', 'new']);
  }

  OnDeleteTask(task: Task) {
    this.taskService.removeTask(task) ;
  }

  onViewTask(id: number) {
    this.router.navigate(['/tasks', 'view', id]);
  }
  
  OnDestroy() {
    this.tasksSubscription.unsubscribe();
  }

OnEditTask(task :Task){
  this.router.navigate(['/tasks','edit',task.title,task.description,task.responsible,task.state]) ;
}


}
