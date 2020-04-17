import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: Observable<User>;
  isEditing: boolean;
  editForm: FormGroup;
  name: FormControl;
  email: FormControl;
  address: FormControl;
  phoneNumber: FormControl;

  userName: string;

  constructor(private userService: UserService) { 
    this.isEditing = false;
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.createFormControls();
    this.createForm();
    this.isEditing = false;
  }

  createFormControls() {
    this.name = new FormControl('');
    this.user.subscribe(usr => this.name.setValue(usr.name));
    this.email = new FormControl('');
    this.user.subscribe(usr => this.email.setValue(usr.email));
    this.address = new FormControl('');
    this.user.subscribe(usr => this.address.setValue(usr.address));
    this.phoneNumber= new FormControl('');
    this.user.subscribe(usr => this.phoneNumber.setValue(usr.phoneNumber));
  }

  createForm() {
    this.editForm = new FormGroup({
      name: this.name,
      email: this.email,
      address: this.address,
      phoneNumber: this.phoneNumber
    })
  }

  edit() {
    this.isEditing = true;
  }

  onSubmit() {
    this.userService.updateUser(this.name.value, this.email.value, this.address.value, this.phoneNumber.value);
    this.ngOnInit();
  }

}
