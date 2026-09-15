import { Request, Response } from 'express';
import { cartService } from '@container/services';
import { asyncHandler } from '@utils/asyncHandler';
import { presentCart } from '@controllers/presenters/cart.presenter';
import { presentOrder } from '@controllers/presenters/order.presenter';
import { sendCreated, sendData } from '@utils/response';

export const get = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.get(req.user!.id);
  sendData(res, presentCart(cart));
});

export const addItem = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.addItem(req.user!.id, req.body.bookId, req.body.quantity);
  sendCreated(res, presentCart(cart));
});

export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.updateItem(
    req.user!.id,
    String(req.params.bookId),
    req.body.quantity,
  );
  sendData(res, presentCart(cart));
});

export const removeItem = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.removeItem(req.user!.id, String(req.params.bookId));
  sendData(res, presentCart(cart));
});

export const clear = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.clear(req.user!.id);
  sendData(res, presentCart(cart));
});

export const checkout = asyncHandler(async (req: Request, res: Response) => {
  const order = await cartService.checkout(
    req.user!.id,
    req.body.shippingAddress,
    req.body.discountCode,
  );
  sendCreated(res, presentOrder(order));
});
