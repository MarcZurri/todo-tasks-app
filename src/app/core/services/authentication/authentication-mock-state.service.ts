import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, Subject, tap } from 'rxjs';
import { IAuthenticationResponse } from '../../models/authentication.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationMockStateService {

  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);

  public authResponse: IAuthenticationResponse | null = null;

  constructor() {
    this.authenticationService.authResponse$.subscribe((authResponse) => {
      this.authResponse = authResponse;
    });
  }
}
