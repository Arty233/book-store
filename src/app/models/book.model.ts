
export class Author {
    firstName: string;
    lastName: string;
}

export class Book {
    authors: Author[];
    imageUrl: string;
    pageCount: number;
    title: string;
    year: Date;

    constructor(authors: Author[], pageCount: number, title: string, year: Date, imageUrl: string) {
        this.authors = authors;
        this.pageCount = pageCount;
        this.title = title;
        this.year = year;
        this.imageUrl = imageUrl;
    }
};
