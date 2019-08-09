import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Task} from 'src/models/task.model';
import * as firebase from 'firebase' ;
import { timingSafeEqual } from 'crypto';
@Injectable()
export class TasksService {

 tasks: Task[] = [];
  tasksSubject = new Subject<Task[]>();
  constructor() {
    this.getTasks();
}
getTasks() {
  firebase.database().ref('/tasks')
    .on('value', (data: firebase.database.DataSnapshot) => {
        this.tasks = data.val() ? data.val() : [];
        this.emitTasks();
      }
    );
}
getTasksByState() {
  firebase.database().ref('/tasks')
    .on('value', (data: firebase.database.DataSnapshot) => {
        this.tasks = data.val() ? data.val() : [];
        this.emitTasks();
      }
    );
}

getSingleTask(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/tasks/' + id).once('value').then(
        (data: firebase.database.DataSnapshot) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
      );
    }
  );
}
  emitTasks() {
    this.tasksSubject.next(this.tasks);
  }
  saveTasks() {
    firebase.database().ref('/tasks').set(this.tasks);
  }
 
  createNewTask(newTask: Task) {
    this.tasks.push(newTask);
    this.saveTasks();
    this.emitTasks();
  }
  editTask(OLDTask : Task,NewTask :Task){
    this.removeTask(OLDTask) ;
    this.createNewTask(NewTask) ;
  }

  removeTask(task :Task) {
    if(task.photo) {
      const storageRef = firebase.storage().refFromURL(task.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const taskIndexToRemove = this.tasks.findIndex(
      (taskEl) => {
        if(taskEl === task) {
          return true;
        }
      }
    );
    this.tasks.splice(taskIndexToRemove, 1);
    this.saveTasks();
    this.emitTasks();
}
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
}
}