import type { Order } from '@app-types/order';
import { toOrderDto } from '@services/dto/order.mapper';

export function presentOrder(order: Order) {
  return toOrderDto(order);
}

export function presentOrders(orders: Order[]) {
  return orders.map(presentOrder);
}
