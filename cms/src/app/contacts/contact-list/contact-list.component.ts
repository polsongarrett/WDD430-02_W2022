import { Contact } from './../contact.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Array<Contact> = [
    new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", null), 
    new Contact(2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", null)
  ];

  @Output() selectedContactEvent = new EventEmitter<Contact>();

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  onSelected(contactElement: Contact) {
    this.selectedContactEvent.emit(contactElement);
  }

}
