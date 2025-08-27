import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { AuthenticationMockStateService } from '../services/authentication/authentication-mock-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    private readonly authStateService = inject(AuthenticationMockStateService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    const canActivate = this.authStateService.authResponse?.accessToken ? true : false;

    if (!canActivate) {
      window.alert("Unauthorized access, you must login first.");
    }

    return canActivate;
  }
  
}
