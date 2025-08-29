import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ITask, ITaskResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly apiUrl = environment.apiUrl;

  // private readonly authResponseSubject = new Subject<IAuthenticationResponse | null>();
  // public authResponse$ = this.authResponseSubject.asObservable();

  private readonly http: HttpClient = inject(HttpClient);

  public getTasks(itemsNumber: number, page: number): Observable<ITaskResponse> {
    return this.http.get<ITaskResponse>(`${this.apiUrl}/todos?limit=${itemsNumber}&skip=${page * itemsNumber}`);
  }

  public getTaskById(id: string): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiUrl}/todos/${id}`);
  }
}
