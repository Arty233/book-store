import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IAppState } from 'src/app/core/store/state';
import { Store, select } from '@ngrx/store';
import { selectUserObject } from 'src/app/core/store/user-store/user.selectors';
import { User } from 'src/app/models/user.model';
import { Book } from 'src/app/models/book.model';
import { selectShowcaseList } from 'src/app/core/store/show-case-store/showcase.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user$: Observable<User> = this._store.pipe(select(selectUserObject));
  books$: Observable<Book[]> = this._store.pipe(select(selectShowcaseList));

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    
  }

}
