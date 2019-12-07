import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  userForm: FormGroup =this.formBuilder.group({
    name: ['', Validators.required],
  });
  submitted = false;


  get f() { return this.userForm.controls; }




  ngOnInit() { 

    if(this.config.data.userId){
      this.service.GetRequest(1,`/api/users/${this.config.data.userId}`,{}).then(data=>{
        console.log(data)
        let user= {...data}
        this.userForm.patchValue({ name: user['name'] },
             { emitEvent: true}) 
      })
    }


  }
  Upsert() { 
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let url = (this.config.data.userId) ? `/api/users/${this.config.data.userId}` : '/api/users'
    this.service.PostRequest(1, url, this.userForm.value).then(data => {
      this.ref.close();
    });
  }
}
