import { Component, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Observable, combineLatest, map } from 'rxjs';
import { ConversationsService } from 'src/app/core/conversations.service';
import { ChatRoom } from 'src/app/core/models/chat-room.model';
import { User } from 'src/app/core/models/user.model';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;
  currentUser = localStorage.getItem('user');
  conversation$!: Observable<SnapshotAction<ChatRoom>[]>;
  availableUsers$!:Observable<User[]>;

  constructor(private userManagementService: UserManagementService, private conversationService: ConversationsService) {
    this.users$ = this.userManagementService.getUsers().pipe(map((users: User[]): User[] => {
      return users.filter((user: User) => {
        return user.userId !== this.currentUser
      })}));

    this.conversation$ = this.conversationService.getConversations()
      .pipe(map((conversations: SnapshotAction<ChatRoom>[]) => {
        return conversations.filter((conversation) => {
          return conversation.payload.val()?.userOne === this.currentUser || conversation.payload.val()?.userTwo === this.currentUser
        })}))
  }

  ngOnInit(): void {
    this.availableUsers$=combineLatest([this.users$, this.conversation$]).pipe(
      map(([users, conversations]) => {
        return users.filter(user => {
          const userId = user.userId;
          // Check if the user ID exists as userOne or userTwo in any conversation
          const userExistsInConversation = conversations.some(conversation => {
            const userOne = conversation.payload.val()?.userOne;
            const userTwo = conversation.payload.val()?.userTwo;
            return userOne === userId || userTwo === userId;
          });
          // Return users who are not part of any conversation
          return !userExistsInConversation;
        });
      })
    )
  }

  userTrackByFn(index: number, user: User): string {
    return user.userId; // Use a unique identifier from the user object
  }


}
