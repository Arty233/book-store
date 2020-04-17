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

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  books$: Observable<Book[]> = this._store.pipe(select(selectShowcaseList));
  constructor(private bookServ: BookService, private _store: Store<IAppState>) {

  }

  ngOnInit(): void {
    this._store.dispatch(getBooks());
  }
}
