import type { Cart, CartItem } from '@app-types/cart';

export interface ICartRepository {
  findByUserId(userId: string): Promise<Cart | null>;
  getOrCreate(userId: string): Promise<Cart>;
  save(cart: Cart): Promise<Cart>;
  setItems(userId: string, items: CartItem[]): Promise<Cart>;
  clear(userId: string): Promise<Cart | null>;
}
