import type { ICartRepository } from '@repositories/interfaces/cart.repository';
import type { IBookRepository } from '@repositories/interfaces/book.repository';
import type { Cart } from '@app-types/cart';
import { DomainError } from '@utils/DomainError';
import { assertPositiveQuantity, assertSufficientStock } from '@utils/business/stock';
import { mergeCartItem } from '@utils/business/cart.totals';

export class AddToCartUseCase {
  constructor(
    private readonly carts: ICartRepository,
    private readonly books: IBookRepository,
  ) {}

  async execute(userId: string, bookId: string, quantity: number): Promise<Cart> {
    assertPositiveQuantity(quantity);
    const book = await this.books.findById(bookId);
    if (!book) throw new DomainError('Book not found', 'NOT_FOUND');

    const cart = await this.carts.getOrCreate(userId);
    const existing = cart.items.find((i) => i.bookId === bookId);
    const newQty = (existing?.quantity ?? 0) + quantity;
    assertSufficientStock(book.stock, newQty, book.title);

    cart.items = mergeCartItem(cart.items, bookId, quantity);
    return this.carts.save(cart);
  }
}
