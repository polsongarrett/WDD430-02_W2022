import { Entry } from './entry.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  private entries: Entry[] = [];
  private entriesUpdated = new Subject<Entry[]>();

  constructor(private http: HttpClient) {

  }

  getEntries() {
    this.http.get('http://localhost:3000/api/entries')
      .subscribe((entryData: Entry[]) => {
        this.entries = entryData;
        this.entriesUpdated.next([...this.entries]);
      });
  }

  getEntryUpdatedListener() {
    return this.entriesUpdated.asObservable();
  }

  addEntry(date: string, text: string) {
    const entry: Entry = { id: null,  date: date, text: text };
    this.entries.push(entry);
    this.entriesUpdated.next([...this.entries]);
  }
}
