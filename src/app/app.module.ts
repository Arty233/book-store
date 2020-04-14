import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { environment } from 'src/environments/environment';


//запихнуть в отдельный модуль
import { StoreModule } from '@ngrx/store';
import * as fromShowcase from 'src/app/core/store/show-case-store/showcase.reducers';
import * as fromTest from 'src/app/core/store/test/test.reducer'; //ttt
import { EffectsModule } from '@ngrx/effects';
import { ShowcaseEffects } from 'src/app/core/store/show-case-store/showcase.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TestComponent } from './components/showcase/test.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ShowcaseComponent,
    CartComponent,
    AccountComponent,
    CreateBookComponent,
    TestComponent //ttt
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    //запихнуть в отдельный модуль
    StoreModule.forRoot({ showcase: fromShowcase.showcaseReducer, test: fromTest.testReducer }),
    EffectsModule.forRoot([ShowcaseEffects]), //если написать forFeature вместо forRoot, то не работает
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
