import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AccountGuard } from './components/account/account.guard';
import { EditBookComponent } from './components/edit-book/edit-book.component';


const routes: Routes = [
  { path: '', component: ShowcaseComponent },
  { path: 'create', component: CreateBookComponent },
  { path: 'user', component: AccountComponent, canActivate: [AccountGuard] },
  { path: 'cart', component: CartComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'edit/:id', component: EditBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AccountGuard]
})
export class AppRoutingModule { }
