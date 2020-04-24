import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { AuthService } from '../auth-service/auth.service';
import { map } from "rxjs/operators";
import { IAppState } from '../../store/state';
import { Store, select } from '@ngrx/store';
import { selectUserObject } from '../../store/user-store/user.selectors';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    id: string;
    user$: Observable<User>;
    constructor(private db: AngularFireDatabase, private _store: Store<IAppState>) {
        this.user$ = _store.pipe(select(selectUserObject));
    }

    getUser(): Observable<User> {
        this.id = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
        if (this.id) {
            return this.db.object('users/' + this.id).valueChanges().pipe(
                map((res: any) => {
                    return new User(res.name, res.email, res.phoneNumber, res.address, res.cart)
                })
            )
        }
        else {
            console.log('no user now');
            return null;
        }
    }

    updateUser(user): void {
        console.log(user);
        firebase.database().ref('users/' + this.id).set({
            name: user.name,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber
        })
    }

    addBookToCart(book): void {
        this.user$.subscribe(usr => {
            this.db.database.ref('books').orderByChild("title").equalTo(book.title).on("child_added", (snapshot) => {
                if (Object.values(usr.cart).indexOf(snapshot.key) > -1) {
                    console.log('Book already exist');
                } else {
                    this.db.database.ref('users/' + this.id).child('cart').push(snapshot.key);
                }
            })
        }).unsubscribe();
    }

    deleteBookFromCart(bookId): void {
        let cartElemRef = this.db.database.ref('users/' + this.id + '/cart/' + bookId);
        cartElemRef.remove();
        console.log('deleted');
    }


}