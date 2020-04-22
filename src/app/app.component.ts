import { Component } from '@angular/core';
import * as firebase from "firebase/app";
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from './core/store/state';
import { selectUserObject } from './core/store/user-store/user.selectors';
import { getUser, userLogout } from './core/store/user-store/user.actions';
import { AuthService } from './core/services/auth-service/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store';
  user$: Observable<User>;

  constructor(private _store: Store<IAppState>, private auth: AuthService) {
    this.user$ = this._store.pipe(select(selectUserObject));

  }

  logout() {
    this.auth.logout();
    this._store.dispatch(userLogout())
  }
}
