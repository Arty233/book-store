
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select} from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state';
import { selectFeatureCount } from 'src/app/core/store/test/test.selectors';
import { Observable } from 'rxjs';
import * as testActions from 'src/app/core/store/test/test.actions'

  @Component({
    selector: 'test',
    template: `
    <p>Test</p>
    {{tt$ | async}}
    <button (click)="this.increment()">++</button>
    <button (click)="this.decrement()">--</button>
    <br/>
    <input #input placeholder="new value">
    <button (click)="this.setNewVal(input.value)">submit new value</button>
    `,
  })
  export class TestComponent implements OnInit {
  
    tt$: Observable<number> = this._store.pipe(select(selectFeatureCount));

    
    constructor(private _store: Store<IAppState>) { }
  
    ngOnInit(): void {
    }

    increment(): void {
      this._store.dispatch(testActions.increment());
    }

    decrement(): void {
      this._store.dispatch(testActions.decrement());
    }

    setNewVal(newValue):void {
      this._store.dispatch(testActions.setNewValue({newValue}));
    }
  
  }