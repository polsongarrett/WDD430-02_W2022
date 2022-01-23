import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  currentSender: string = "Garrett Polson";

  @ViewChild('subject', { static: false }) subjectRef: ElementRef;
  @ViewChild('message', { static: false }) messageRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const message = this.messageRef.nativeElement.value;
    const newMessage = new Message(Math.random() * 1001, subject, message, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.messageRef.nativeElement.value = "";
  }

}
