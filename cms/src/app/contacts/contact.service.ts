import { Contact } from './contact.model';
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  maxContactId: number;
  contacts: Array<Contact>  = [];

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

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

  addContact(newContact: Contact) {
    if(!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactListClone: Contact[] = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return;
    }
    
    let position: number = this.contacts.indexOf(originalContact);
    if(position < 0) {
      return
    }
    
    newContact.id = originalContact.id;
    this.contacts[position] = newContact;
    let contactListClone: Contact[] = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const position = this.contacts.indexOf(contact);
    if (position < 0) {
      return;
    }

    this.contacts.splice(position, 1);
    let contactListClone: Contact[] = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  getMaxId(): number {
    let maxId: number = 0;
    this.contacts.forEach(contact => {
      let currentId: number = parseInt(contact.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }
}
