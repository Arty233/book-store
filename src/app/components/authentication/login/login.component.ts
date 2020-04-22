import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from "firebase/app";
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state';
import { User } from 'src/app/models/user.model';
import { selectUserObject } from 'src/app/core/store/user-store/user.selectors';
import { Observable } from 'rxjs';
import { getUser } from 'src/app/core/store/user-store/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['.././authentication.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  message: string;
  user$: Observable<User>;
  UserEmail: string;

  constructor(private auth: AuthService, private router: Router, private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    })
  }

  onSubmit() {
    this.message = null;
    firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value).then(
      () => {
        console.log('Redirect');
        this._store.dispatch(getUser());
        console.log('user:' + this.user$)
      }
    ).then(
      () => {
        localStorage.user = this.user$;
        this.user$ = this._store.pipe(select(selectUserObject));
        console.log('user:' + this.user$);
      }
    ).catch(
      (error) => {
        let errorMessage = error.message;
        console.log(errorMessage);
        this.message = errorMessage
      }
    )
  }

  signInWithGoogle() {
    this.auth.loginWithGoogle();
  }

  redirectToLogin() {
    this.router.navigate(['signup']);

  }
}
