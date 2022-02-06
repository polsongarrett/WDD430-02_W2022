import { Contact } from './contact.model';
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  contacts: Array<Contact>  = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  getContacts(): Array<Contact> {
    return this.contacts.slice();
  } 

  getContact(id: string): Contact {
    let contact = this.contacts.find(element => element.id == id);
    return contact;
  }
}
