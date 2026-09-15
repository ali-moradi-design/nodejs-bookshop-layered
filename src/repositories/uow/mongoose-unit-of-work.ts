import type { IUnitOfWork, UnitOfWorkSession } from '@repositories/uow/unit-of-work.port';
import { withTransaction } from '@repositories/uow/transaction';

export class MongoUnitOfWork implements IUnitOfWork {
  runInTransaction<T>(fn: (session: UnitOfWorkSession | null) => Promise<T>): Promise<T> {
    return withTransaction((session) => fn(session));
  }
}
