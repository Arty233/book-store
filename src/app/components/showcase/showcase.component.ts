import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../../models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  books: Observable<Book[]>;
  constructor(private bookServ: BookService) {

  }

  ngOnInit(): void {
    this.books = this.bookServ.getBooks()
  }

}
