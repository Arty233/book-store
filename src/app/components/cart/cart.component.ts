import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IAppState } from 'src/app/core/store/state';
import { Store, select } from '@ngrx/store';
import { selectUserObject } from 'src/app/core/store/user-store/user.selectors';
import { User } from 'src/app/models/user.model';
import { Book } from 'src/app/models/book.model';
import { selectShowcaseList } from 'src/app/core/store/show-case-store/showcase.selectors';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { BookService } from 'src/app/core/services/book-service/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user$: Observable<User> = this._store.pipe(select(selectUserObject));

  cartBooks: Book[];
  cart: Object;
  cartArray: string[];
  totalItems: number;

  constructor(private _store: Store<IAppState>, private bookService: BookService, private userService: UserService) {
    this.user$.subscribe(usr => {
      this.cart = usr.cart;
      this.cartArray = Object.values(this.cart);
    });
    this.cartBooks = this.bookService.getCartBooks(this.cartArray);
    this.totalItems = this.cartArray.length;
    console.log(this.cartArray);


  }

  ngOnInit(): void {
    console.log(this.cartBooks);
  }

  deleteCartItem(book) {
    let id = Object.keys(this.cart)[this.cartBooks.indexOf(book)];
    this.userService.deleteBookFromCart(id);
    this.cartBooks.splice(this.cartBooks.indexOf(book),1);
    this.totalItems -= 1;
  }

}
