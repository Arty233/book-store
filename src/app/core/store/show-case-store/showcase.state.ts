import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';

export interface IShowCaseState {
    books: Observable<Book[]>;
}

export const initialState: IShowCaseState = {
    books: null
}