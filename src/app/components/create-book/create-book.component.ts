import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/core/services/book-service/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {


  createBookForm: FormGroup = this.formBuilder.group({
    authors: this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    }),
    imageUrl: [''],
    pageCount: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(3)]],
    year: ['', [Validators.required]]
  })


  constructor(private bookService: BookService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
  }

  onSubmit() {
    this.bookService.addBook(this.createBookForm.getRawValue());

  }




}
