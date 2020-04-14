import { createSelector } from '@ngrx/store';
import { IShowCaseState } from './showcase.state';
import { IAppState } from '../state';

export const selectShowcase = (state: IAppState) => state.showcase;

export const selectShowcaseList = createSelector(
    selectShowcase,
    (state: IShowCaseState) => state.books
);