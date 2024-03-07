import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { ChatRoom, Conversation } from './models/chat-room.model';
import { Message } from './models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {
  chatRoom$ = new ReplaySubject<string>(1)

  set setChatRoom(value: string) {
    this.chatRoom$.next(value)
  }

  get getChatRoom(): Observable<string> {
    return this.chatRoom$.asObservable()
  }

  constructor(private fireDb: AngularFireDatabase, private router: Router) { }

  createChatRoom(chatRoom: ChatRoom) {
    this.fireDb.list('conversations').push(chatRoom).get().then((conversation) => {
      this.setChatRoom=conversation.key as string
      this.router.navigate(['chat-board/chat', conversation.key])
    })
  }

  getConversations(): Observable<SnapshotAction<ChatRoom>[]> {
    return this.fireDb.list('conversations').snapshotChanges() as Observable<SnapshotAction<ChatRoom>[]>
  }

  getConversationById(id?: string):Observable<Conversation> {
    return this.fireDb.object('conversations/' + id).valueChanges() as Observable<Conversation>
  }

  sendMessage(id: string, message: Message) {
    this.fireDb.list(`conversations/${id}/messages`).push(message)
  }

  getMessagesForConversation(id: string): Observable<Message[]> {
    return this.fireDb.list('conversations/' + id + '/messages').valueChanges() as Observable<Message[]>

  }
}
