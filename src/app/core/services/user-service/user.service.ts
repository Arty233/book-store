import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from "firebase/app";
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { AuthService } from '../auth-service/auth.service';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    id: string;
    constructor(private db: AngularFireDatabase) {
    }

    // getUser(): Observable<User[]> {
    //     return this.db.list('users').valueChanges().pipe(map((res: any) => {
    //         return res.map(item => {
    //             return new User(
    //                 item.name,
    //                 item.email
    //             )
    //         });
    //     }))
    // }

    getUser(): Observable<User> {
        return this.db.object('users/' + this.id).valueChanges().pipe(
            map((res: any) => {
                return new User(res.name, res.email, res.phoneNumber, res.address)
            })
        )
    }

    updateUser(name, email, address, phoneNumber): void {
        firebase.database().ref('users/' + this.id).set({
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber
        })
    }
}