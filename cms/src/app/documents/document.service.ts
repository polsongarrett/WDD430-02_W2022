import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  maxDocumentId: number;
  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.documents = this.getDocuments();
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {

    this.http.get<{ documents: Document[] }>('https://wdd430cms-1b049-default-rtdb.firebaseio.com/documents.json')
      .subscribe((documents: any) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();

        this.documents.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 : 0)
        this.documentListChangedEvent.next(this.documents.slice());
      },
        (error: any) => {
          console.log('Error:', error);
        }
      )
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    let document = this.documents.find(element => element.id == id);
    return document;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // let documentListClone: Document[] = this.documents.slice();
    // this.documentListChangedEvent.next(documentListClone);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let position: number = this.documents.indexOf(originalDocument);
    if (position < 0) {
      return
    }

    newDocument.id = originalDocument.id;
    this.documents[position] = newDocument;
    // let documentListClone: Document[] = this.documents.slice();
    // this.documentListChangedEvent.next(documentListClone);
    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }

    const position = this.documents.indexOf(document);
    if (position < 0) {
      return;
    }

    this.documents.splice(position, 1);
    // let documentListClone: Document[] = this.documents.slice();
    // this.documentListChangedEvent.next(documentListClone);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId: number = 0;
    this.documents.forEach(document => {
      let currentId: number = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  storeDocuments() {
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://wdd430cms-1b049-default-rtdb.firebaseio.com/documents.json', documents, { headers: headers })
      .subscribe( () => { 
        this.documentListChangedEvent.next(this.documents.slice()); 
      });
  }
}
