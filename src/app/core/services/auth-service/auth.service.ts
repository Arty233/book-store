import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  email: string;
  password: string;
  constructor(private afd: AngularFireDatabase) {

  }

  signUp(email: string, password: string, name: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) { //генерим айди
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(error.message);
    }).then(
      () => { this.login(email, password) }
    ).then(
      () => { this.createUser(email, name, firebase.auth().currentUser.uid); }
    )

  }

  createUser(email: string, name: string, uid: string): void {
    let user = <User>{
      name: name,
      email: email
    }
    this.afd.database.ref('users/' + uid).set(user);
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(error.message);
    });

  }



}
