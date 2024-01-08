import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (coerceBooleanProperty(sessionStorage.key(0) && localStorage.getItem('user'))) {
      this.router.navigate(['chat-board'])
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    if (!coerceBooleanProperty(sessionStorage.key(0) && localStorage.getItem('user'))) {
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
}
