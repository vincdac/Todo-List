import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private Http: HttpClient) { }

  postTask(data: any) {
    return this.Http.post<any>("http://localhost:3000/todolist", data)
  }

  getTask() {
    return this.Http.get<any>("http://localhost:3000/todolist")
  }

  deleteTask(id: number) {
    return this.Http.delete<any>("http://localhost:3000/todolist/" + id)
  }

  updateTask(data: any, id: number) {
    return this.Http.put<any>("http://localhost:3000/todolist/" + id, data)
  }
}
