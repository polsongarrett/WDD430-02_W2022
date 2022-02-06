import { MOCKMESSAGES } from './MOCKMESSAGES';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Array<Message>  = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Array<Message> {
    return this.messages.slice();
  } 

  getMessage(id: string): Message {
    let message = this.messages.find(element => element.id == id);
    return message;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    console.log("addMessage in MessageService", message);
    console.log("messages in MessageService", this.messages);
  }
}
