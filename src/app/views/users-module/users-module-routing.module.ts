import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component'
import { UsersDetailComponent } from './users-detail/users-detail.component'


const routes: Routes = [
  {path:'', component:UsersComponent},
  // {path:'userDetail/:id', component:UsersDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersModuleRoutingModule { }
