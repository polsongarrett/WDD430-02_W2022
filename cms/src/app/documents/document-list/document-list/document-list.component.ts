import { Document } from './../../document.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Array<Document> = [
    new Document(Math.random() * 1001, "file00.txt", "A text file", "../../assets/documents/file00.txt"),
    new Document(Math.random() * 1001, "file01.txt", "A text file", "../../assets/documents/file01.txt"),
    new Document(Math.random() * 1001, "file02.txt", "A text file", "../../assets/documents/file02.txt"),
    new Document(Math.random() * 1001, "file03.txt", "A text file", "../../assets/documents/file03.txt"),
    new Document(Math.random() * 1001, "file04.txt", "A text file", "../../assets/documents/file04.txt")
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void { }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
