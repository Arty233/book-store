import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private db: AngularFireDatabase) { }

  getBooks(): Observable<Book[]> {
    return this.db.list('books').valueChanges().pipe(map((res: any) => {
      return res.map(item => {
        return new Book(
          item.authors,
          item.pageCount,
          item.title,
          item.year
        )
      });
    }))
  }
}
