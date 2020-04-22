import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, switchMapTo } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../state';
import * as userActions from './user.actions';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth-service/auth.service';

@Injectable()
export class UserEffects {

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.getUser),

    // instead of returning an empty operator in catchError, let's return an empty array
    switchMap(() => this.userService.getUser().pipe(catchError(() => of([])))),

    // the main problem in your code was that payload: books; use payload: {books}
    map((user: User) => userActions.getUserSuccess({ user })),
  ));


  constructor(
    private actions$: Actions,
    private userService: UserService,
    private auth: AuthService,
    private _store: Store<IAppState>
  ) { }
}