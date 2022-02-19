import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  maxDocumentId: number;
  documents: Array<Document> = [];
  
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Array<Document> {
    return this.documents.slice();
  } 

  getDocument(id: string): Document {
    let document = this.documents.find(element => element.id == id);
    return document;
  }
  
  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentListClone: Document[] = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }
  
  updateDocument(originalDocument: Document, newDocument: Document) {
    if(!originalDocument || !newDocument) {
      return;
    }
    
    let position: number = this.documents.indexOf(originalDocument);
    if(position < 0) {
      return
    }
    
    newDocument.id = originalDocument.id;
    this.documents[position] = newDocument;
    let documentListClone: Document[] = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
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
    let documentListClone: Document[] = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  getMaxId(): number {
    let maxId: number = 0;
    this.documents.forEach(document => {
      let currentId: number = parseInt(document.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }
}
