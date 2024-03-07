import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConversationsModule } from '../conversations/conversations.module';
import { UsersModule } from '../users/users.module';
import { AuthorizationService } from './authorization.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationErrorComponent } from './navigation-error/navigation-error.component';
import { SiteLogoComponent } from './site-logo/site-logo.component';



@NgModule({
  declarations: [
    NavBarComponent,
    NavigationErrorComponent,
    SiteLogoComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    UsersModule,
    ConversationsModule,
    MatListModule
  ],
  exports:[
    NavBarComponent,
    NavigationErrorComponent,
    SiteLogoComponent
  ],
  providers:[AuthorizationService]
})
export class CoreModule { }
