import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConversationsService } from 'src/app/core/conversations.service';
import { ChatRoom } from 'src/app/core/models/chat-room.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user!: User;
  @Input() conversationId!: string;
  private subscription = new Subscription()

  constructor(private conversationService: ConversationsService, private router: Router) {
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { this.subscription.unsubscribe() }

  navigateToConversation(id:string) {
    //TODO:pass room id
    this.router.navigate(['chat-board/chat',id])
  }

  createChatRoom(userId: string) {
    const currentUser = localStorage.getItem('user')
    if (!currentUser) return;
    const chatRoom: ChatRoom = {
      userOne: userId,
      userTwo: currentUser
    }
    this.conversationService.createChatRoom(chatRoom)
  }
}
