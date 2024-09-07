
import { Component } from '@angular/core';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TaskComponent]
})
export class AppComponent {
  title = 'Todo List';
}
