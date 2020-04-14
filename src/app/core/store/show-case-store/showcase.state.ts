import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';

export interface IShowCaseState {
    books: Book[];
}

export const initialState: IShowCaseState = {
    books: []
}