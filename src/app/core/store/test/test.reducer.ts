import { createReducer, on, State, Action } from '@ngrx/store';
import { initialState } from './test.state';
import * as testActions from './test.actions';

export const testReducer = createReducer(
    initialState,
    on(testActions.increment, (state) => ({ ...state, value: state.value + 1})),
    on(testActions.decrement, (state) => ({...state, value: state.value - 1})),
    on(testActions.setNewValue, (state, {newValue}) => ({...state, value: newValue}))
)