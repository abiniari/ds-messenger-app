import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as firebase from 'firebase/database';
import { combineLatest, filter, switchMap } from 'rxjs';
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

  retrieveMessages() {
    this.conversationsService.getMessagesForConversation(this.conversationId)
  }

  getConversation() {
    if (!this.conversationId) { return }
    combineLatest([
      this.conversationsService.getConversationById(this.conversationId),
      this.conversationsService.getMessagesForConversation(this.conversationId)
    ])
      .subscribe(([conversation,messages]) => {
        this.conversation = conversation;
        if (!this.conversation) {
          this.routers.navigate(['/error'])
          return;
        }
        this.conversationMessages = messages

      })
  }

  convertMessagesToArray(conversation: Conversation): Message[] {
    return conversation ? Object.values(conversation)
      .filter((value): value is Message => typeof value === 'object' && 'content' in value) : [];
  }

  sendMessage() {
    const currentUser = localStorage?.getItem('user')
    if (!currentUser) { return }
    const message: Message = {
      sender: currentUser,
      receiver: this.conversation.userOne !== currentUser ? this.conversation.userOne : this.conversation.userTwo,
      content: this.messageControl.value,
      timestamp: firebase.serverTimestamp()
    }
    this.conversationsService.sendMessage(this.conversationId,message)
    this.messageControl.patchValue(null)
  }

}
