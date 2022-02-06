import { DocumentService } from './../../document.service';
import { Document } from './../../document.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  providers: []
})
export class DocumentListComponent implements OnInit {

  documents: Array<Document> = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
   }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

}
