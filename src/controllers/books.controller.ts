import { Request, Response } from 'express';
import { bookService } from '@container/services';
import { asyncHandler } from '@utils/asyncHandler';
import { presentBook, presentBooks } from '@controllers/presenters/book.presenter';
import { sendCreated, sendData, sendMessage, sendPaginated } from '@utils/response';

export const list = asyncHandler(async (req: Request, res: Response) => {
  const result = await bookService.list({
    q: req.query.q as string | undefined,
    category: req.query.category as string | undefined,
    minPrice: req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined,
    inStock: req.query.inStock as boolean | undefined,
    featured: req.query.featured as boolean | undefined,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
    sort: (req.query.sort as 'price' | 'title' | 'createdAt') || 'createdAt',
    order: (req.query.order as 'asc' | 'desc') || 'desc',
  });
  sendPaginated(res, presentBooks(result.data), result.meta);
});

export const listFeatured = asyncHandler(async (_req: Request, res: Response) => {
  const data = await bookService.listFeatured(20);
  sendData(res, presentBooks(data));
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const book = await bookService.getById(String(req.params.id));
  sendData(res, presentBook(book));
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const book = await bookService.create(req.body);
  sendCreated(res, presentBook(book));
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const book = await bookService.update(String(req.params.id), req.body);
  sendData(res, presentBook(book));
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await bookService.remove(String(req.params.id));
  sendMessage(res, 'Book soft-deleted');
});
