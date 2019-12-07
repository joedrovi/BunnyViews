import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() { 

    if(this.config.data.taskId){
      this.service.GetRequest(2,`/api/tasks/${this.config.data.taskId}`,{}).then(data=>{
        let task= {...data}
        console.log(task)
        this.taskForm.patchValue({
          description: task['description'], 
           state: task['state'], 
          },
             { emitEvent: true}) 
      })
    }


  }

  taskForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],
    state: [false],
  });
  submitted = false;


  get f() { return this.taskForm.controls; }






  Upsert() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    let url = (this.config.data.taskId) ? `/api/tasks/${this.config.data.taskId}` : '/api/tasks'
    this.service.PostRequest(2, url, { ...this.taskForm.value, ...{ user_id: this.config.data.userId } }).then(data => {
      this.ref.close();
    });
  }




}
