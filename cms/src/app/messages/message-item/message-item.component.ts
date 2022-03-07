import { ContactService } from './../../contacts/contact.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  providers: [ContactService]
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    let contact: Contact;
    this.contactService.contactListChangedEvent.subscribe( () => {
      contact = this.contactService.getContact(this.message.sender);
      if(!contact) {
        this.messageSender = 'unknown';
      }
      else {
        this.messageSender = contact.name;
      }
    });
  }

}
