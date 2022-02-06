import { ContactService } from './../contact.service';
import { Contact } from './../contact.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: []
})
export class ContactListComponent implements OnInit {

  contacts: Array<Contact> = [];

  constructor(private contactService: ContactService) { 
    
  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contactElement: Contact) {
    this.contactService.contactSelectedEvent.emit(contactElement);
  }

}
