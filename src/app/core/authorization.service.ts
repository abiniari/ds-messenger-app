import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { LoginDialogComponent } from '../login/login-dialog/login-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements OnDestroy {

  get userLoggedInState(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  set userLoggedIn(value: boolean) {
    this.loggedInSubject.next(value)
  }

  private loggedInSubject = new ReplaySubject<boolean>(1)

  private subscription = new Subscription();

  constructor(
    private fireAuth: AngularFireAuth,
    private fireDb: AngularFireDatabase,
    private loginDialog: MatDialog,
    private router: Router) {
    this.setAuthPersistence()
    this.checkAuthState()
  }

  signUpUser(email: string, password: string, firstName: string) {
    return this.fireAuth.createUserWithEmailAndPassword(
      email.trim(),
      password.trim()
    ).then((user: any) => {
      const newUser = {
        userId: user.user?.uid,
        userName: firstName
      }
      this.userLoggedIn = false;
      this.fireAuth.signOut().then(() =>
      this.loginDialog.open(LoginDialogComponent, { width: '400' }));
      this.fireDb.list('users').push(newUser)
    })
  }

  singInUser(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then((user: any) => {
        localStorage.setItem('user', user.user?.uid);
        this.userLoggedIn = true;
        this.router.navigate(['/chat-board'])
      })
  }

  signOutUser() {
    this.fireAuth.signOut().then(() => {
      this.userLoggedIn = false;
      localStorage.removeItem('user')
      this.router.navigate(['login'])
    })

  }

  private setAuthPersistence() { this.fireAuth.setPersistence('session'); }

  private checkAuthState() {
    this.subscription.add(this.fireAuth.authState.subscribe((authUser) => {
      if (authUser && localStorage.getItem('user')) {
        if (authUser.uid === localStorage.getItem('user')) {
          this.userLoggedIn = true;
        }
      }
      else {
        this.userLoggedIn = false;
        localStorage.removeItem('user')
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
