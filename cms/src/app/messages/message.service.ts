import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[]  = [];
  maxMessageId: number;
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) { 
    this.messages = this.getMessages();
  }

  getMessages(): Message[] {
    this.http.get<{ messages: Message[] }>('https://wdd430cms-1b049-default-rtdb.firebaseio.com/messages.json')
    .subscribe((messages: any) => {
      this.messages = messages;
      this.maxMessageId = this.getMaxId();

      this.messages.sort((x, y) => (x.id < y.id) ? 1 : (x.id > y.id) ? -1 : 0)
      this.messageChangedEvent.next(this.messages.slice());
    },
      (error: any) => {
        console.log('Error:', error);
      }
    )
  return this.messages.slice();
    
  } 

  getMessage(id: string): Message {
    let message = this.messages.find(element => element.id == id);
    return message;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId: number = 0;
    this.messages.forEach(message => {
      let currentId: number = parseInt(message.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  storeContacts() {
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://wdd430cms-1b049-default-rtdb.firebaseio.com/messages.json', messages, { headers: headers })
      .subscribe( () => { 
        this.messageChangedEvent.next(this.messages.slice()); 
      });
  }
}
