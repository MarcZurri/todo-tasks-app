import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ITask } from '../models/task.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-task-detail',
  imports: [MatProgressSpinnerModule, MatCardModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private readonly taskService = inject(TasksService);

  task = signal<ITask | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const taskId = params['id'];
      this.getTaskDetails(taskId);
    });
  }

  private getTaskDetails(taskId: string): void {
    this.taskService.getTaskById(taskId).subscribe((task) => {
      this.task.set(task);
    });
  }
}
