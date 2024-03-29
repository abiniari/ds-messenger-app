import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthorizationService } from '../authorization.service';
import { User } from '../models/user.model';
import { UserManagementService } from './../../users/user-management.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  logo: string = '/assets/logo.png';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn!: boolean;
  public userName$: Observable<string | null>;
  public usersList!: boolean;

  @ViewChild('drawer', { static: false }) drawer!: MatSidenav;
  @ViewChild('innerDrawer', { static: false }) innerDrawer!: MatSidenav;

  private subsciption = new Subscription();

  constructor(
    public authService: AuthorizationService,
    private breakpointObserver: BreakpointObserver,
    private userManagementService: UserManagementService) {
    this.subsciption.add(this.authService.userLoggedInState.subscribe((state) => this.isLoggedIn = state))
    this.userName$ = this.userManagementService.getUsers().pipe(map((users: User[]): string => {
      const loggedUser = users.find((user: User) => {
        const userId = localStorage.getItem('user');
        return user.userId === userId
      })
      return loggedUser ? loggedUser.userName : '';
    }))
  }

  openUsersDrawer() {
    this.usersList=true
    this.innerDrawer.open()
  }

  openMessagesDrawer() {
    this.usersList=false
    this.innerDrawer.open()
  }

  toggleDrawer() {
    this.drawer?.toggle()
  }

  logoutUser() { this.authService.signOutUser(); }

}
