import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as firebase from 'firebase/database';
import { filter } from 'rxjs';
import { ConversationsService } from 'src/app/core/conversations.service';
import { Conversation } from 'src/app/core/models/chat-room.model';
import { Message } from 'src/app/core/models/message.model';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.scss']
})
export class ChatBoardComponent {

  messageControl = new FormControl();
  conversation!: Conversation;
  private conversationId!: string;

  myMessages: Message[] = [];
  friendMessages: Message[] = [];
  currentUser = localStorage.getItem('user')
  conversationMessages: Message[] = []

  constructor(private conversationsService: ConversationsService,
    private activeRouterSnapshot: ActivatedRoute,
    private router: ActivatedRoute,
    private routers: Router) {
    this.conversationId = this.activeRouterSnapshot.children[0]?.snapshot?.params['id']
    this.routers.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.conversationId = this.router.snapshot.children[0]?.params['id']
      this.getConversation()
    });
  }

  getConversation() {
    if (!this.conversationId) { return }
    this.conversationsService.getConversationById(this.conversationId)
      .subscribe((conversation: Conversation) => {
        this.conversation = conversation;
        if (!this.conversation) {
          this.routers.navigate(['/error'])
          return; }
        this.conversationMessages = this.convertMessagesToArray(conversation.messages);

      })
  }

  convertMessagesToArray(messages: any): any[] {
    return messages ? Object.keys(messages).map(key => messages[key]) : [];
  }

  sendMessage() {
    const currentUser = localStorage?.getItem('user')
    if (!currentUser) { return }
    const message: Message = {
      sender: currentUser,
      reciever: this.conversation.userOne !== currentUser ? this.conversation.userOne : this.conversation.userTwo,
      content: this.messageControl.value,
      timestamp: firebase.serverTimestamp()
    }
    this.conversationsService.sendMessage(this.conversationId, message)
    this.messageControl.patchValue(null)
  }

}
