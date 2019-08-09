import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';

import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms' ;
import { SigninComponent } from './auth/signin/signin.component';
import {Routes, RouterModule} from '@angular/router'
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-list/task-form/task-form.component';
import { TasksService } from './services/tasks.service';
import { TaskEditComponent } from './task-list/task-edit/task-edit.component';
import { TaskListStatesComponent } from './task-list/task-list-states/task-list-states.component' ;
const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'tasks/all', canActivate: [AuthGuardService], component: TaskListComponent },
  { path: 'tasks/state/:state', canActivate: [AuthGuardService], component: TaskListStatesComponent },
  { path: 'tasks/new', canActivate: [AuthGuardService], component: TaskFormComponent },
  { path: 'tasks/edit/:title/:description/:responsible/:state', canActivate: [AuthGuardService], component: TaskEditComponent },
  { path: '', redirectTo: 'tasks/all', pathMatch: 'full' },
  { path: '**', redirectTo: 'tasks/all' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskEditComponent,
    TaskListStatesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    AuthService,
    AuthGuardService,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
