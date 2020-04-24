import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../../../models/book.model';
import * as firebase from 'firebase';

const IDs = ['0', '2'];

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private db: AngularFireDatabase) {
  }

  getBooks(): Observable<Book[]> {
    // this.db.object('books/5').valueChanges().subscribe(book => console.log(book));
    return this.db.list('books').valueChanges().pipe(
      map((res: any) => {
        return res.map(item => {
          return new Book(
            item.authors,
            item.pageCount,
            item.title,
            item.year,
            item.imageUrl
          )
        });
      }))
  }

  // getBook(id): Observable<Book> {
  //   return this.db.object('books/' + id).valueChanges().pipe(
  //     map((res: any) => {
  //       return new Book(
  //         res.authors,
  //         res.pageCount,
  //         res.title,
  //         res.year,
  //         res.imageUrl
  //       )
  //     })
  //   )
  // }


  getCartBooks(ids): Book[] {
    let books: Book[] = [];
    for (let id of ids) {
      this.db.object('books/' + id).valueChanges().subscribe((book:any) => {
        console.log(id);
        let newBook = new Book(
          book.authors,
          book.pageCount,
          book.title,
          book.year,
          book.imageUrl)
        books.push(newBook);
      });
    }
    return books;
  }

  addBook(book): void {
    let booksRef = this.db.database.ref('books');
    let newBook = booksRef.push();
    newBook.set({
      authors: [{
        firstName: book.authors.firstName,
        lastName: book.authors.lastName
      }],
      imageUrl: book.imageUrl,
      pageCount: book.pageCount,
      title: book.title,
      year: book.year
    })
  }

  editBook(book, prevTitle) {
    this.db.database.ref('books').orderByChild("title").equalTo(prevTitle).on("child_added", (snapshot) => {
      this.db.database.ref('books/' + snapshot.key).set({
        authors: [{
          firstName: book.authors.firstName,
          lastName: book.authors.lastName
        }],
        imageUrl: book.imageUrl,
        pageCount: book.pageCount,
        title: book.title,
        year: book.year
      })
    });
  }

}
