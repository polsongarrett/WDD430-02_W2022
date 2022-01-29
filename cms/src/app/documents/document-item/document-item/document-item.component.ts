import { Document } from './../../document.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
