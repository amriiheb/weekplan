import { Component, OnInit } from '@angular/core';
import { Task } from 'src/models/task.model';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list-states',
  templateUrl: './task-list-states.component.html',
  styleUrls: ['./task-list-states.component.scss']
})
export class TaskListStatesComponent implements OnInit {
  tasks: Task[];
  tasksSubscription: Subscription;
  state  = this.route.snapshot.params['state'];
  constructor(private taskService: TasksService, private router: Router,private route :ActivatedRoute) {}

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
