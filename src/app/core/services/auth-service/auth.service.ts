import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state';
import { getUser } from '../../store/user-store/user.actions';
import { selectUserObject } from '../../store/user-store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  email: string;
  password: string;
  constructor(private afd: AngularFireDatabase, private _store: Store<IAppState>) {

  }

  signUp(email: string, password: string, name: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) { //генерим айди
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(error.message);
    }).then(
      () => { firebase.auth().signInWithEmailAndPassword(email, password) }
    ).then(
      () => { this.createUser(email, name, firebase.auth().currentUser.uid); }
    )
  }

  loginWithGoogle() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.createUser(firebase.auth().currentUser.email, firebase.auth().currentUser.email, firebase.auth().currentUser.uid);
    }).then(() => {
      this._store.dispatch(getUser());
    }).then(() => {
      this.user$ = this._store.pipe(select(selectUserObject));
    });
  }

  createUser(email: string, name: string, uid: string): void {
    this.afd.database.ref('users/' + uid).once('value')
      .then((data) => {
        if (data.val()) {
          console.log("User already exists");
        }
        else {
          let user = <User>{
            name: name,
            email: email
          }
          this.afd.database.ref('users/' + uid).set(user);
          console.log('user created!');
        }
      })
  }

  // createUser(email: string, name: string, uid: string): void {
  //   this.afd.database.ref('users/' + uid).once('value')
  //     .then((data) => {
  //       if (data.val()) {
  //         Promise.reject('UID already exist!');
  //       }
  //     }).then(() => {
  //       let user = <User>{
  //         name: name,
  //         email: email
  //       }
  //       this.afd.database.ref('users/' + uid).set(user);
  //       console.log('user created!')
  //     })
  // }

  logout() {
    firebase.auth().signOut().catch(error => {
      console.log(error)
    });
  }

  // login(email: string, password: string): any {
  //   firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
  //     let errorCode = error.code;
  //     let errorMessage = error.message;
  //     console.log(errorMessage);
  //     return false
  //   }).then(
  //     creds => { console.log(creds); console.log('ща типа редирект'); return true }
  //   )

  // }



}
