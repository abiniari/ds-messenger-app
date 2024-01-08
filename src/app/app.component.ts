import { Component } from '@angular/core';
import { AuthorizationService } from './core/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ds-messenger';

  loggedIn$: Observable<boolean>

  constructor(private authorizationService: AuthorizationService) {
    this.loggedIn$ = this.authorizationService.userLoggedInState;

  }
}
