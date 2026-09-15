import type { Cart } from '@app-types/cart';
import { toCartDto } from '@services/dto/cart.mapper';

export function presentCart(cart: Cart) {
  return toCartDto(cart);
}
