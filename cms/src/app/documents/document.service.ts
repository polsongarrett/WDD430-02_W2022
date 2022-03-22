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

    this.http.get<{ documents: Document[] }>('http://localhost:3000/documents')
      .subscribe((response: any) => {
        this.documents = response.documents;
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


addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.documents.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 : 0)
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.documents.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 :   0)
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.documents.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 :   0)
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  getMaxId(): number {
    let maxId: number = 0;
    if (this.documents.length > 0) {
      
      this.documents.forEach(document => {
        let currentId: number = parseInt(document.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      });
    }
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
