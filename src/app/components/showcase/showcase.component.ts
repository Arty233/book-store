import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { map, filter } from "rxjs/operators";
import { Book } from '../../models/book.model';
import { BookService } from 'src/app/core/services/book-service/book.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state';
import { selectShowcaseList } from 'src/app/core/store/show-case-store/showcase.selectors';
import { getBooks } from 'src/app/core/store/show-case-store/showcase.actions';

import { TestComponent } from './test.component'; //ttt
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  books$: Observable<Book[]>;
  filteredBooks$: Observable<Book[]>;
  isFiltered: boolean = false;
  searchForm = new FormGroup({
    searchField: new FormControl(''),
  })

  storage = firebase.storage();
  IMAGES_URL = 'https://res.cloudinary.com/dqv0hzy1a/image/upload/';
  storageRef;


  constructor(private bookServ: BookService, private usrServ: UserService, private _store: Store<IAppState>, private router: Router) {
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

    this.searchForm.get('searchField').valueChanges.subscribe(
      term => this.search(term)
    )

  }

  redirectToEdit(book) {
    // console.log(book);
    this.books$.subscribe(x => {
      this.router.navigate(['edit/' + x.indexOf(book)])
    }).unsubscribe();
    // this.bookServ.editBook(book);
  }

  search(term) {
    term = term.toLowerCase();
    this.filteredBooks$ = this.books$.pipe(
      map(books => books.filter(book => {
        return book.title.toLowerCase().includes(term) || book.year.toString().includes(term) ||
          book.authors[0].firstName.toLowerCase().includes(term) || book.authors[0].lastName.toLowerCase().includes(term)
      }))
    )
    this.isFiltered = true;
  }


  sort(x){
    switch (x) {
    case 'title':
      this.filteredBooks$ = this.books$.pipe(
        map(books => {
          console.log(books);
          return books.slice().sort(this.sortByTitle)
        })
      )
    }
    this.isFiltered = true;
  }

  sortByTitle(a,b) {
    if (a.title < b.title)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }




  addToCart(book) {
    this.usrServ.addBookToCart(book);
  }
}
