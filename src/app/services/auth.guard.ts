import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.isLoggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login/']);
    }
    return true;
  }
}
