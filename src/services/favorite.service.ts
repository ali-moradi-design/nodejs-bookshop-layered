import type { IFavoriteRepository } from '@repositories/interfaces/favorite.repository';
import type { IBookRepository } from '@repositories/interfaces/book.repository';
import type { Favorite } from '@app-types/favorite';
import { AppError } from '@utils/AppError';

export class FavoriteService {
  constructor(
    private readonly favorites: IFavoriteRepository,
    private readonly books: IBookRepository,
  ) {}

  async list(userId: string): Promise<Favorite[]> {
    return this.favorites.listByUser(userId, true);
  }

  async add(userId: string, bookId: string): Promise<Favorite> {
    const book = await this.books.findById(bookId);
    if (!book) throw new AppError('Book not found', 404);

    const existing = await this.favorites.findByUserAndBook(userId, bookId);
    if (existing) throw new AppError('Book already in favorites', 409);

    return this.favorites.create({ userId, bookId });
  }

  async remove(userId: string, bookId: string): Promise<void> {
    const ok = await this.favorites.deleteByUserAndBook(userId, bookId);
    if (!ok) throw new AppError('Favorite not found', 404);
  }
}
