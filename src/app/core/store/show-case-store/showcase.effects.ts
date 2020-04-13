import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { BookService } from 'src/app/core/services/book.service';

@Injectable()
export class ShowcaseEffects {
    getBooks$ = createEffect(() => this.actions$.pipe(
        ofType('[Showcase] getBooks'),
        mergeMap(() => this.booksService.getBooks()
            .pipe(
                map(books => ({
                    type: '[Showcase API] BooksLoaded Success',
                    payload: books
                })),
                catchError(() => EMPTY)
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private booksService: BookService
    ) {}
}