import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['.././authentication.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private auth: AuthService, private router: Router) { }

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
    // TODO: Use EventEmitter with form value
    this.auth.login(this.email.value, this.password.value);
  }

  redirectToLogin() {
    this.router.navigate(['signup']);

  }
}
