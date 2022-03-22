import { Contact } from './contact.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  maxContactId: number;
  contacts: Contact[]  = [];

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) { 
    this.contacts = this.getContacts();
   }

  getContacts(): Contact[] {
    this.http.get<{ contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe((response: any) => {
        this.contacts = response.contacts;
        this.maxContactId = this.getMaxId();

        this.contacts.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 : 0)
        this.contactListChangedEvent.next(this.contacts.slice());
      },
        (error: any) => {
          console.log('Error:', error);
        }
      );

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

    // make sure id of the new Document is empty
    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.contacts.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 : 0)
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return;
    }
    
    const position: number = this.contacts.findIndex(d => d.id === originalContact.id);
    if(position < 0) {
      return
    }
    
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[position] = newContact;
          this.contacts.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 :   0)
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.contacts.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 :   0)
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  getMaxId(): number {
    let maxId: number = 0;

    if(this.contacts.length > 0) {
      this.contacts.forEach(contact => {
        let currentId: number = parseInt(contact.id);
        if(currentId > maxId) {
          maxId = currentId;
        }
      });
    }
    return maxId;
  }

  storeContacts() {
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://wdd430cms-1b049-default-rtdb.firebaseio.com/contacts.json', contacts, { headers: headers })
      .subscribe( () => { 
        this.contactListChangedEvent.next(this.contacts.slice()); 
      });
  }
}
