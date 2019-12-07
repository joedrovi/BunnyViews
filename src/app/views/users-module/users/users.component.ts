import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DialogService, ConfirmationService } from 'primeng/api';
import { UsersDetailComponent } from './../users-detail/users-detail.component'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TasksComponent } from '../../tasks/tasks.component';

import * as _ from "lodash";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DialogService],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class UsersComponent implements OnInit {

  public users: any[] = [];

  constructor(
    private service: ApiService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.service.GetRequest(1, '/api/users').then(data => {
      this.users = data;
    });
  }
  deleteUser(userId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.service.PostRequest(1, `/api/users/delete/${userId}`).then(data => {
          this.service.PostRequest(2, `/api/tasks/byUser/delete/${userId}`).then(data => {
            console.log(data);
            this.getAllUsers();
          })
            .catch(error => console.log(error));
        })
          .catch(error => console.log(error));
      }
    });

  }
  onEditUser(userId = null) {
    const ref = this.dialogService.open(UsersDetailComponent, {
      data: {
        userId
      },
      header: 'Edit user name',
      width: '70%'
    });

    ref.onClose.subscribe(() => {
      this.getAllUsers()
    })
  }

  getTasks(expanded, userId) {
    if (expanded) {
      return;
    }
    const indexUser = _.findIndex(this.users,(u)=>{ return u.id == userId})
    this.service.GetRequest(2, `/api/tasks/byUser/${this.users[indexUser].id}`).then(data => {
      this.users[indexUser].tasks = data;
    });
  }

  editTask(userId, taskId = null) {
    const ref = this.dialogService.open(TasksComponent, {
      data: {
        userId,
        taskId
      },
      header: 'Edit task',
      width: '70%'
    });
    ref.onClose.subscribe(() => {
      this.getTasks(false,userId)
    })
  }

  deleteTask(userId, taskId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.service.PostRequest(2, `/api/tasks/delete/${taskId}`).then(data => {
          this.getTasks(false,userId);
        });
      }
    });
  }

  



}
