import { createSelector } from '@ngrx/store';
import { IAppState } from '../state';
import { IUserState } from './user.state';

export const selectUser = (state: IAppState) => state.user;

export const selectUserObject = createSelector(
    selectUser,
    (state: IUserState) => state.user
);