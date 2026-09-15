import type { Favorite, CreateFavoriteInput } from '@app-types/favorite';

export interface IFavoriteRepository {
  listByUser(userId: string, populate?: boolean): Promise<Favorite[]>;
  findByUserAndBook(userId: string, bookId: string): Promise<Favorite | null>;
  create(input: CreateFavoriteInput): Promise<Favorite>;
  deleteByUserAndBook(userId: string, bookId: string): Promise<boolean>;
}
