import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const getUser = createAction(
    '[User] getUser'
)

export const getUserSuccess = createAction(
    '[User API] UserLoaded Success',
    props<{user: User}>()
);

export const userLogout = createAction(
    '[User] userLogout'
);