import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Entry } from './../entry.model';
import { EntriesService } from './../entries.service';

@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css']
})
export class EntryCreateComponent implements OnInit {
  entry: Entry;
  private mode: string = 'create';
  private id: string;

  constructor(public entriesService: EntriesService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.entry = this.entriesService.getEntry(this.id);
      }
      else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onSaveEntry(entryForm: NgForm) {
    if (entryForm.invalid) {
      return;
    }

    if (this.mode == 'create') {
      this.entriesService.addEntry(new Date(Date.now()).toLocaleString().split(',')[0], entryForm.value.content);
    }
    else {
      this.entriesService.updateEntry(
        this.entry.id,
        this.entry.date,
        entryForm.value.content
      );
    }

    entryForm.resetForm();
  }

}
