import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { BookService } from 'src/app/core/services/book-service/book.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../state';
import * as showcaseActions from './showcase.actions';

@Injectable()
export class ShowcaseEffects {

  getBooks$ = createEffect(() => this.actions$.pipe(
    ofType(showcaseActions.getBooks),

    // instead of returning an empty operator in catchError, let's return an empty array
    switchMap(() => this.booksService.getBooks().pipe(catchError(() => of([])))),

    // the main problem in your code was that payload: books; use payload: {books}
    map(books => showcaseActions.getBooksSuccess({ books })),
  ));

  constructor(
    private actions$: Actions,
    private booksService: BookService,
    private _store: Store<IAppState>
  ) { }
}