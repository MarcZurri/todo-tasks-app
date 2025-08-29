import { Routes } from '@angular/router';
import { AuthenticationGuard } from '@core/guards/authentication.guard';
import { Home } from '@features/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home - Todo App',
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/task-list/task-list').then((m) => m.TaskList),
    canActivate: [AuthenticationGuard],
    children: [],
  },
  {
    path: 'tasks/:id',
    loadComponent: () =>
      import('./features/tasks/task-detail/task-detail').then((m) => m.TaskDetail),
    canActivate: [AuthenticationGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
