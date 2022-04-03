import { EntriesService } from './../entries.service';
import { Entry } from './../entry.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit, OnDestroy {

  entries: Entry[] = [];
  private entriesSubscription: Subscription;

  constructor(public entriesService: EntriesService) { }

  ngOnInit(): void {
    this.entriesService.getEntries();
    this.entriesSubscription = this.entriesService.getEntryUpdatedListener()
      .subscribe((entries: Entry[]) => {
        this.entries = entries;
      });
  }

  ngOnDestroy(): void {
    this.entriesSubscription.unsubscribe();
  }
}
