import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { environment } from 'src/environments/environment';
import { TestComponent } from './components/showcase/test.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    CartComponent,
    AccountComponent,
    CreateBookComponent,
    TestComponent,
    LoginComponent,
    SignupComponent //ttt
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
