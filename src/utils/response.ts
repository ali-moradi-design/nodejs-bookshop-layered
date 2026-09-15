import type { Response } from 'express';
import type { PaginationMeta } from '@utils/pagination';

/** Standard success envelope helpers — keep controllers thin and consistent. */
export function sendData<T>(res: Response, data: T, status = 200): void {
  res.status(status).json({ data });
}

export function sendCreated<T>(res: Response, data: T): void {
  res.status(201).json({ data });
}

export function sendMessage(res: Response, message: string, status = 200): void {
  res.status(status).json({ message });
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  meta: PaginationMeta,
  status = 200,
): void {
  res.status(status).json({ data, meta });
}
