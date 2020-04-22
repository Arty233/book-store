import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { selectUserObject } from 'src/app/core/store/user-store/user.selectors';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state';
import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountGuard implements CanActivate {

    user$: Observable<User>
    isLoggedIn: boolean;

    constructor(private _state: Store<IAppState>) {
        this.user$ = _state.select(selectUserObject);
        this.user$.subscribe(user => this.isLoggedIn = Boolean(user));

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


        return this.isLoggedIn;

    }
}