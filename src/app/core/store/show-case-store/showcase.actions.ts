import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book.model';
import { Observable } from 'rxjs';

export const getBooks = createAction(
    '[Showcase] getBooks'
)

export const getBooksSuccess = createAction(
    '[Showcase API] BooksLoaded Success',
    props<{books: Book[]}>()
);