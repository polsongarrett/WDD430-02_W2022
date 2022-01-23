import { Message } from './../message.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Array<Message> = [
    new Message(Math.random() * 1001, "haha", "lol", "Jack"), 
    new Message(Math.random() * 1001, "hehehe", "lolol", "Jill"),
    new Message(Math.random() * 1001, "harhar", "lel", "Jim")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
