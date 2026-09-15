import type { AuthUser } from './auth';

export type { AuthUser };

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      requestId?: string;
    }
  }
}

export {};
