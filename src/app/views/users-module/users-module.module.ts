import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersModuleRoutingModule } from './users-module-routing.module';
import { UsersComponent } from './users/users.component'
import { UsersDetailComponent } from './users-detail/users-detail.component'
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from '../tasks/tasks.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersDetailComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    UsersModuleRoutingModule,
    TableModule,
    DynamicDialogModule,
    ButtonModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    UsersDetailComponent,
    TasksComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class UsersModuleModule { }
