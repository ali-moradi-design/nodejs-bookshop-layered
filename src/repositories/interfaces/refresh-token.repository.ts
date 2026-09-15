import type { RefreshTokenRecord } from '@app-types/auth';

export interface IRefreshTokenRepository {
  create(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<RefreshTokenRecord>;
  findValidByHash(tokenHash: string): Promise<RefreshTokenRecord | null>;
  revoke(tokenHash: string, replacedByHash?: string): Promise<void>;
}
