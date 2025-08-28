import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, Subject, tap } from 'rxjs';
import { IAuthenticationResponse } from '../../models/authentication.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;

  private readonly authResponseSubject = new Subject<IAuthenticationResponse | null>();
  public authResponse$ = this.authResponseSubject.asObservable();

  private readonly http: HttpClient = inject(HttpClient);

  public authenticate(): Observable<IAuthenticationResponse> {
    const body = {
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 5,
    };

    return this.http
      .post<IAuthenticationResponse>(`${this.apiUrl}/auth/login`, body)
      .pipe(tap((authResponse) => this.setAuthResponse(authResponse)));
  }

  logout() {
    this.setAuthResponse(null);
  }

  private setAuthResponse(authResponse: IAuthenticationResponse | null): void {
    this.authResponseSubject.next(authResponse);
  }

  // public refreshToken(): Observable<IAuthenticationResponse> {
  //   const body = {
  //     refreshToken: 'some-refresh-token'
  //   };
  //   return this.http.post<IAuthenticationResponse>(`${this.apiUrl}/auth/refresh`, body);
  // }
}
