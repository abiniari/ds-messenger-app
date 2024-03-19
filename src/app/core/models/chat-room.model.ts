import { Message } from "./message.model";

export interface ChatRoom {
  id?:string;
  userOne:string;
  userTwo:string;
}

export interface Conversation extends ChatRoom {
  id?:string;
  userOne:string;
  userTwo:string;
}
