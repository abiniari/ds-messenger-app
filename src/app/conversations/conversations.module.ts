import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [
    ConversationsListComponent
  ],
  imports: [
    CommonModule,
    UsersModule
  ],
  exports: [
    ConversationsListComponent
  ],
})
export class ConversationsModule { }
