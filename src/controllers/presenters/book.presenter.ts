import type { Book } from '@app-types/book';
import { toBookDto } from '@services/dto/book.mapper';

export function presentBook(book: Book) {
  return toBookDto(book);
}

export function presentBooks(books: Book[]) {
  return books.map(presentBook);
}
