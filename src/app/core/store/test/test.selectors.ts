import { IAppState } from '../state';
import { ITestState } from './test.state';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: IAppState) => state.test;
 
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: ITestState) => state.value
);