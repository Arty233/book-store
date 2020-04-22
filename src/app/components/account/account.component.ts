import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state';
import { selectUserObject } from 'src/app/core/store/user-store/user.selectors';
import { getUser } from 'src/app/core/store/user-store/user.actions';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user$: Observable<User> = this._store.pipe(select(selectUserObject))
  isEditing: boolean;
  editUserForm: FormGroup =  this.formBuilder.group({
    name:['', [Validators.maxLength(5)]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  })

  userName: string;
  newUserValues: User;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private _store: Store<IAppState>) { 
    this.isEditing = false;
  }

  ngOnInit(): void {
    // this._store.dispatch(getUser());
    this.createFormControls();
    this.isEditing = false;

  }

  async createFormControls() {
    this.user$.subscribe(user => { this.editUserForm.patchValue({
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber
    })});
  }

  

  edit() {
    this.isEditing = true;
  }

  onSubmit() {
    this.userService.updateUser(this.editUserForm.getRawValue());
    this.ngOnInit();
  }

}
