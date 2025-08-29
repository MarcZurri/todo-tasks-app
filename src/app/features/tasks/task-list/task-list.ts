import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TasksService } from '../services/tasks.service';
import { ITask } from '../models/task.model';
import { finalize, take } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { StateToIconPipe } from '@shared/pipes/state-to-icon.pipe';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-list',
  imports: [
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatLineModule,
    MatIconModule,
    StateToIconPipe,
    HighlightDirective,
    MatProgressSpinnerModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  private readonly taskService = inject(TasksService);
  private router = inject(Router);

  tasks = signal<ITask[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadTasks(0, 0);
  }

  public loadTasks(itemsNumber: number, page: number): void {
    this.isLoading.set(true);
    this.taskService
      .getTasks(itemsNumber, page)
      .pipe(take(1), finalize(() => this.isLoading.set(false)))
      .subscribe((tasks) => {
        this.tasks.set(tasks?.todos || []);
      });
  }

  openTask(task: ITask) {
    this.router.navigate(['/tasks', task.id]);
  }
}
