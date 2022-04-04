import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryCreateComponent } from './entries/entry-create/entry-create.component';
import { EntryListComponent } from './entries/entry-list/entry-list.component';

const routes: Routes = [
  { path: '', component: EntryListComponent},
  { path: 'create', component: EntryCreateComponent},
  { path: 'edit/:id', component: EntryCreateComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
