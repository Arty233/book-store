import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/core/store/state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { selectShowcaseList } from 'src/app/core/store/show-case-store/showcase.selectors';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/core/services/book-service/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  books$ = this._store.pipe(select(selectShowcaseList));

  id: any;
  book: Book;
  private subscription: Subscription;
  prevTitle: string;

  editBookForm: FormGroup = this.formBuilder.group({
    authors: this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    }),
    imageUrl: [''],
    pageCount: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(3)]],
    year: ['', [Validators.required]]
  })

  constructor(private _store: Store<IAppState>, private activateRoute: ActivatedRoute, private formBuilder: FormBuilder, private bookService: BookService) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
    this.books$.subscribe(
      (books) => { this.book = books[this.id]; this.prevTitle = this.book.title }
    ).unsubscribe();

  }

  ngOnInit(): void {
    this.createFormControls();
  }

  createFormControls() {
    this.editBookForm.patchValue({ //как вписать авторов разобраться позже
      imageUrl: this.book.imageUrl,
      pageCount: this.book.pageCount,
      title: this.book.title,
      year: this.book.year
    });
  }

  onSubmit() {
    this.bookService.editBook(this.editBookForm.getRawValue(), this.prevTitle)
  }

}
