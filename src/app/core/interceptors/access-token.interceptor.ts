import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationMockStateService } from '../services/authentication/authentication-mock-state.service';

// @Injectable()
// export class AccessTokenInterceptor implements HttpInterceptor {
//   private readonly authStateService = inject(AuthenticationMockStateService);

//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const accessToken = this.authStateService.authResponse?.accessToken;

//     if (accessToken) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//     }

//     return next.handle(request);
//   }
// }

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authStateService = inject(AuthenticationMockStateService);
  const accessToken = authStateService.authResponse?.accessToken;

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return next(req);
};
