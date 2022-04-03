import { EntriesService } from './../entries.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css']
})
export class EntryCreateComponent implements OnInit {

  constructor(public entriesService: EntriesService) {}

  ngOnInit(): void {
  }

  onAddEntry(entryForm: NgForm) {
    if (entryForm.invalid) {
      return;
    }

    this.entriesService.addEntry(new Date(Date.now()).toLocaleString().split(',')[0], entryForm.value.content);
    entryForm.resetForm();
  }

}
