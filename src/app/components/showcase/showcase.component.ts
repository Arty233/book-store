import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../../models/book.model';
import { BookService } from 'src/app/core/services/book-service/book.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state';
import { selectShowcaseList } from 'src/app/core/store/show-case-store/showcase.selectors';
import { getBooks } from 'src/app/core/store/show-case-store/showcase.actions';

import { TestComponent } from './test.component'; //ttt
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  books$: Observable<Book[]>;

  storage = firebase.storage();
  IMAGES_URL = 'https://res.cloudinary.com/dqv0hzy1a/image/upload/';
  storageRef;


  constructor(private bookServ: BookService, private _store: Store<IAppState>, private router: Router) {
    // this.storage.ref().child('images/').getDownloadURL().then(url => this.storageRef = url);
  }

  ngOnInit(): void {
    this._store.dispatch(getBooks());
    this.books$ = this._store.pipe(select(selectShowcaseList))
    // this.books$.subscribe(books => {
    //   books.forEach(book => {
    //     this.storage.ref().child(`images/${book.imageUrl}`).getDownloadURL().then(url => book.imageUrl = url)
    //   })
    // })

    // this.books$.pipe(map(books => {
    //   books.forEach(book => {
    //     this.storage.ref().child(`images/${book.imageUrl}`).getDownloadURL().then(url => {console.log(url); console.log(book.imageUrl)});
    //   })
    // }))

  }

  redirectToEdit(book) {
    // console.log(book);
    this.books$.subscribe(x =>
      {
        this.router.navigate(['edit/' + x.indexOf(book)])
      }).unsubscribe();
    // this.bookServ.editBook(book);
  }
}
