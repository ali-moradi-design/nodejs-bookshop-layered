import { JwtTokenService } from '@utils/token.service';
import { BcryptPasswordHasher } from '@utils/password.service';
import { LocalDiskStorage } from '@utils/local-disk.storage';
import { ConsoleNotifier } from '@utils/console.notifier';
import { MongoUnitOfWork } from '@repositories/uow/mongoose-unit-of-work';
import { logger } from '@utils/logger';
import { domainEvents } from '@utils/events';

export const tokenService = new JwtTokenService();
export const passwordHasher = new BcryptPasswordHasher();
export const storage = new LocalDiskStorage();
export const notifier = new ConsoleNotifier();
export const unitOfWork = new MongoUnitOfWork();
export { logger, domainEvents };

// Wire lightweight domain event stubs to console notifications
domainEvents.on('OrderPaid', async (event) => {
  await notifier.send({
    subject: 'OrderPaid',
    body: JSON.stringify(event.payload),
    meta: { event: event.name },
  });
});

domainEvents.on('StockLow', async (event) => {
  await notifier.send({
    subject: 'StockLow',
    body: JSON.stringify(event.payload),
    meta: { event: event.name },
  });
});
