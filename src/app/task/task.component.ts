import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';  // Importa o módulo de Angular Material

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', dueDate: new Date(), status: 'pending' };
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.dueDate) return;

    const newId = this.tasks.length ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1;
    const taskToAdd: Task = { ...this.newTask, id: newId };
    this.taskService.addTask(taskToAdd);
    this.newTask = { id: 0, title: '', description: '', dueDate: new Date(), status: 'pending' };
  }

  startEdit(task: Task) {
    this.editingTask = { ...task };
  }

  saveEdit() {
    if (this.editingTask) {
      this.taskService.editTask(this.editingTask);
      this.editingTask = null;
    }
  }

  cancelEdit() {
    this.editingTask = null;
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }
}
// src/app/task.component.ts

