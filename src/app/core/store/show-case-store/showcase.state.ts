import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';

export interface IShowCaseState {
    books: Book[];
}

export const initialState: IShowCaseState = {
    books: []
}