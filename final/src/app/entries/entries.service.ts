import { Entry } from './entry.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
      .pipe( map((entryData: any)=> {
        return entryData.map(entry => {
          return {
            date: entry.date,
            text: entry.text,
            id: entry._id
          }
        })
      }))
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
    this.http.post<{entryId: string}>('http://localhost:3000/api/entries', entry)
    .subscribe(responseData => {
        entry.id = responseData.entryId;
        this.entries.push(entry);
        this.entriesUpdated.next([...this.entries]);
      });
  }

  deleteEntry(entryId: string) {
    this.http.delete('http://localhost:3000/api/entries/' + entryId)
      .subscribe(() => {
        const entriesUpdated = this.entries.filter(entry => entry.id !== entryId);
        this.entries = entriesUpdated;
        this.entriesUpdated.next([...this.entries]);
      });
  }
}
