import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  { path: '', component: ShowcaseComponent },
  { path: 'create', component: CreateBookComponent },
  { path: 'user', component: AccountComponent },
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
