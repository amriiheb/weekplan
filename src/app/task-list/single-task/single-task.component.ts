import { Component, OnInit } from '@angular/core';
import { Task } from 'src/models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  task: Task;

  constructor(private route: ActivatedRoute, private taskService: TasksService,
              private router: Router) {}

  ngOnInit() {
    this.task = new Task('','', '');
    const id = this.route.snapshot.params['id'];
    this.taskService.getSingleTask(+id).then(
      (task: Task) => {
        this.task = task;
      }
    );
  }

  onBack() {
    this.router.navigate(['/tasks']);
  }

}
