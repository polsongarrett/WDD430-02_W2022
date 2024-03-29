import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentItemComponent } from './documents/document-item/document-item/document-item.component';
import { DocumentListComponent } from './documents/document-list/document-list/document-list.component';
import { HeaderComponent } from './header.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactEditComponent,
    ContactsFilterPipe,
    ContactItemComponent,
    DropdownDirective,
    DocumentsComponent,
    DocumentDetailComponent,
    DocumentEditComponent,
    DocumentItemComponent,
    DocumentListComponent,
    HeaderComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DragDropModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
