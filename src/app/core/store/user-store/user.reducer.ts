import { createReducer, on, State, Action } from '@ngrx/store';
import { initialState } from './user.state';
import * as userActions from './user.actions'

export const userReducer = createReducer(
    initialState,
    on(userActions.getUserSuccess, (state, {user}) => ({ ...state, user: user})),
    on(userActions.userLogout, stae => (initialState))
)
