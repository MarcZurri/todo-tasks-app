import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected appTitle: string = 'Todo Tasks';
  private readonly snackBar = inject(MatSnackBar);
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);

  protected isLoading = signal(false);

  public signIn(): void {
    this.isLoading.set(true);
    this.authenticationService
      .authenticate()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.snackBar.open('Sign in successful');
        },
        error: (error) => {
          this.snackBar.open('Sign in failed');
        },
      });
  }

  logout() {
    this.authenticationService.logout();
  }
}
