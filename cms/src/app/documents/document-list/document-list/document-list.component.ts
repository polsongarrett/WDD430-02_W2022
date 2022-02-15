import { DocumentService } from './../../document.service';
import { Document } from './../../document.model';
import { Component, OnInit } from '@angular/core';

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
    this.documentService.documentChangedEvent.subscribe((documents: Array<Document>) => {
      this.documents = documents;
    });
   }

  
}
