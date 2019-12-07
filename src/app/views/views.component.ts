import { Component, OnInit } from '@angular/core';
import {ApiService} from './../services/api.service';

import {NgForm} from '@angular/forms'; 

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {


  public users: any[] = [];
  public tasks: any[] = [];

  public selectedUser: number = null;
  public selectedTask: number = null;



  constructor(private service: ApiService) { }

  ngOnInit() {
    // this.service.GetRequest(2,'/api/tasks').then(data=>{
    //   console.log(data);
    // })
    this.getAllUsers();
  }


  send(form: NgForm) {
    this.service.PostRequest(1, '/api/users', form.value).then(data => {
      this.getAllUsers();
      form.reset();
    });
  }


  getAllUsers() {
     this.service.GetRequest(1, '/api/users').then(data => {
      this.users = data;
    });
  }

  updateUser(userId, form: NgForm){
    this.selectedUser = userId;
    this.service.PostRequest(1, `/api/users/${userId}`, form.value).then(data => {
      this.getAllUsers();
   });
 }

 deleteUser(userId){
  this.service.PostRequest(1, `/api/users/delete/${userId}`).then(data => {
    this.service.PostRequest(2, `/api/tasks/byUser/delete/${userId}`).then(data => {
      console.log(data);
      this.getAllUsers();
    })
    .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
}


  createTask(form: NgForm) {
    this.service.PostRequest(2, '/api/tasks', { ... form.value, ... {user_id: this.selectedUser} } ).then(data => {
      this.getTasks(this.selectedUser);
      form.reset();
    });
  }

 
  getTasks(userId) {
    this.selectedUser = userId;
    this.service.GetRequest(2, `/api/tasks/byUser/${userId}`).then(data => {
      this.tasks = data;
    });
  }

  deleteTask(taskId, form: NgForm) {
    this.selectedTask = taskId;
    this.service.PostRequest(2, `/api/tasks/delete/${taskId}`).then(data => {
      this.getTasks(this.selectedUser);
    });
  }

  updateTask(taskId, form: NgForm) {
    this.service.PostRequest(2, `/api/tasks/${taskId}`, form.value ).then(data => {
      this.getTasks(this.selectedUser);
    });
  }



}
