import { Component } from '@angular/core';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store';
  userEmail: string;
  constructor() {
    if (firebase.auth().currentUser)
      this.userEmail = firebase.auth().currentUser.email
  }

}
