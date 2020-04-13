import { createReducer, on, State, Action } from '@ngrx/store';
import { initialState } from './showcase.state';
import * as showcaseActions from './showcase.actions'



// const showcaseReducer = createReducer(
//     initialState,
//     on(showcaseActions.getBooks, state => ({ ...state, books: bookServ.getBooks() }))
//   );
//
export const showcaseReducer = createReducer(
    initialState,
    on(showcaseActions.getBooksSuccess, (state, {books}) => ({ ...state, books: books}))
)

// export function reducer(state: State | undefined, action: Action) {
//     return showcaseReducer(state, action);
//   }