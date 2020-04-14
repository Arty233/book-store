import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';

export const increment = createAction(
    '[Test] increment'
)

export const decrement = createAction(
    '[Test] decrement'
)

export const setNewValue = createAction(
    '[Test] setNewValue',
    props<{newValue: any}>()
)