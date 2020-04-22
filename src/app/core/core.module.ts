import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromShowcase from 'src/app/core/store/show-case-store/showcase.reducers';
import * as fromUser from 'src/app/core/store/user-store/user.reducer';
import * as fromTest from 'src/app/core/store/test/test.reducer'; //ttt
import { ShowcaseEffects } from 'src/app/core/store/show-case-store/showcase.effects';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserEffects } from './store/user-store/user.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ showcase: fromShowcase.showcaseReducer, test: fromTest.testReducer, user: fromUser.userReducer }),
    EffectsModule.forRoot([ShowcaseEffects, UserEffects]), //если написать forFeature вместо forRoot, то не работает
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
  ],
  providers: [AngularFireAuth]
})
export class CoreModule { }
