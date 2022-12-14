import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from '../data';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-email',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class EmailComponent implements OnInit {

  tasks !: FormGroup;
  data: Data = new Data();
  taskData !: any;
  showUpdate !: Boolean;
  showAdd !: Boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.tasks = this.formBuilder.group({
      task: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.displaylist();
  }

  resetForm() {
    this.tasks.reset();
  }

  addTask() {
    this.data.task = this.tasks.value.task;
    this.data.time = this.tasks.value.time;
    this.data.description = this.tasks.value.description;
    console.log(this.data);

    this.api.postTask(this.data)
      .subscribe(res => {
        alert("Task Added successfully")
        this.displaylist();
        this.tasks.reset();
      },
        err => {
          alert("Something went wrong during adding")
        })
  }

  displaylist() {
    this.api.getTask()
      .subscribe(res => {
        this.taskData = res
      },
        err => {
          alert("something went wrong during display")
        })
  }

  removeTask(data: any) {
    this.api.deleteTask(data.id)
      .subscribe(res => {
        alert("successfully deleted task")
        this.displaylist();
      },
        err => {
          alert("something went wrong during deleting")
        })
  }

  onEdit(data: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.data.id = data.id
    this.tasks.controls['task'].setValue(data.task);
    this.tasks.controls['time'].setValue(data.time);
    this.tasks.controls['description'].setValue(data.description);
  }

  editTask() {
    this.data.task = this.tasks.value.task;
    this.data.time = this.tasks.value.time;
    this.data.description = this.tasks.value.description;

    this.api.updateTask(this.data, this.data.id)
      .subscribe(res => {
        alert("successfully updated task")
        this.displaylist();
        this.resetForm();
      },
        err => {
          alert("something went wrong during updating")
        })
  }

  get task() {
    return this.tasks.get('task');
  }

  get time() {
    return this.tasks.get('time');
  }

  get description() {
    return this.tasks.get('description');
  }
}


