import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { environment } from '@environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IAuthenticationResponse, IAuthUser } from '@core/models/authentication.model';
import { Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  @Input() appTitle: string | null = null;
  @Output() signingIn = new EventEmitter<void>();
  @Output() loggingOut = new EventEmitter<void>();

  public environmentName: string = environment.name;

  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);

  protected authUser = signal<IAuthUser | null>(null);
  protected authUserFullName = computed<string | null>(() =>
    this.authUser() ? `${this.authUser()?.firstName} ${this.authUser()?.lastName}` : null
  );
  readonly destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.authenticationService.authResponse$
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResponse) => {
        this.manageAuthUser(authResponse);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signIn() {
    this.signingIn.emit();
  }
  logout() {
    this.loggingOut.emit();
  }

  private manageAuthUser(authResponse: IAuthenticationResponse | null): void {
    const user: IAuthUser | null = authResponse
      ? {
          id: authResponse.id,
          username: authResponse.username,
          email: authResponse.email,
          firstName: authResponse.firstName,
          lastName: authResponse.lastName,
          gender: authResponse.gender,
          image: authResponse.image,
        }
      : null;
    this.authUser.set(user);
  }
}
