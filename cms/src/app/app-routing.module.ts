import { ContactsComponent } from './contacts/contacts.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentsComponent } from './documents/documents.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {path: '', redirectTo: 'documents', pathMatch: 'full'},
  {path: 'documents', component: DocumentsComponent},
  {path: 'messages/message-list', component: MessageListComponent},
  {path: 'contacts', component: ContactsComponent}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}