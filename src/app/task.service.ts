import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  editTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
  }
}
