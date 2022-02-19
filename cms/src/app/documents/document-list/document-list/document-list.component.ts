import { DocumentService } from './../../document.service';
import { Document } from './../../document.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  providers: []
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Array<Document> = [];
  subscription: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe((documents: Array<Document>) => {
      this.documents = documents;
    });
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
    });
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
