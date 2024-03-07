import { Component, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Observable, combineLatest, map } from 'rxjs';
import { ConversationsService } from 'src/app/core/conversations.service';
import { ChatRoom } from 'src/app/core/models/chat-room.model';
import { User } from 'src/app/core/models/user.model';
import { UserManagementService } from 'src/app/users/user-management.service';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {

  users$: Observable<User[]>;
  availableConversations$!: Observable<{ user: User; conversationId: string; }[]>;
  currentUser = localStorage.getItem('user');
  conversations$!: Observable<SnapshotAction<ChatRoom>[]>;

  constructor(private userManagementService: UserManagementService, private conversationService: ConversationsService) {
    this.users$ = this.userManagementService.getUsers().pipe(map((users: User[]): User[] => {
      return users.filter((user: User) => {
        return user.userId !== this.currentUser
      })
    }));


    this.conversations$ = this.conversationService.getConversations()
      .pipe(map((conversations: SnapshotAction<ChatRoom>[]) => {
        return conversations.filter((conversation) => {
          return conversation.payload.val()?.userOne === this.currentUser || conversation.payload.val()?.userTwo === this.currentUser
        })
      }))
  }


  ngOnInit(): void {
    this.availableConversations$ = combineLatest([this.users$, this.conversations$]).pipe(
      map(([users, conversations]) => {
        const availableUsersWithConversations: { user: User, conversationId: string }[] = [];

        users.forEach(user => {
          const userId = user.userId;
          const userExistsInConversation = conversations.some(conversation => {
            const userOne = conversation.payload.val()?.userOne;
            const userTwo = conversation.payload.val()?.userTwo;
            return userOne === userId || userTwo === userId;
          });

          if (!userExistsInConversation) {
            availableUsersWithConversations.push(); // No conversation ID available
          } else {
            // Find the conversation ID for the user
            const conversation = conversations.find(conversation =>
              conversation.payload.val()?.userOne === userId || conversation.payload.val()?.userTwo === userId
            );
            if (conversation) {
              availableUsersWithConversations.push({ user, conversationId: conversation.key as string });
            }
          }
        });
        return availableUsersWithConversations;
      })
    );
  }


}
