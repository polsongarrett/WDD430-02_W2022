import { MessageService } from './../message.service';
import { Message } from './../message.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [MessageService]
})
export class MessageListComponent implements OnInit {

  messages: Array<Message> = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(messages => {
      this.messages = messages;
    });
  }

  // onAddMessage(message: Message) {
  //   this.messages.push(message);
  // }

}
