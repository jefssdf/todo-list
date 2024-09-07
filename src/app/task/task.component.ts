import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

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
  errorMessage: string | null = null;

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
      const updatedTask: Task = { ...this.editingTask, dueDate: new Date(this.editingTask.dueDate) };
      this.taskService.editTask(updatedTask);
      this.editingTask = null;
    }
  }

  cancelEdit() {
    this.editingTask = null;
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  markAsCompleted(task: Task) {
    const today = new Date();
    const dueDate = new Date(task.dueDate);

    console.log('Hoje:', today);
    console.log('Data de vencimento:', dueDate);

    if (dueDate >= today) {
      console.log('Marcando como concluída');
      const updatedTask: Task = { ...task, status: 'completed' };
      this.taskService.editTask(updatedTask);
      this.errorMessage = null;
    } else {
      console.log('Não é possível marcar como concluída');
      this.errorMessage = 'Não é possível marcar como concluída. A tarefa está fora do prazo.';
    }
  }

  getStatusLabel(status: 'pending' | 'completed'): string {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluída';
      default:
        return 'Desconhecido';
    }
  }
}
