import { Component, inject } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public environmentName: string = environment.name;
  
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);

  public getTasks(): void {
    // Call the authentication service to get tasks
  }

  public signIn(): void {
    this.authenticationService.authenticate().subscribe({
      next: (response) => {
        console.log('User signed in:', response);
      },
      error: (error) => {
        console.error('Sign in failed:', error);
      },
    });
  }
}
