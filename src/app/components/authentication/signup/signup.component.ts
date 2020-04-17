import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['.././authentication.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl('',[Validators.required, Validators.pattern("[^ @]*@[^ @]*")]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  }

  createForm() {
    this.signUpForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password
    })
  }

  onSubmit() {
    this.auth.signUp(this.email.value, this.password.value, this.name.value);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

}
