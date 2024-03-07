import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { ConversationsService } from '../core/conversations.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonModule,
  ],
  providers:[ConversationsService],
  exports:[
    UserComponent,
    UserListComponent
  ]
})
export class UsersModule { }
