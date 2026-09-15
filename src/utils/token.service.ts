import type { ITokenService } from '@services/ports/auth.ports';
import type { AccessTokenPayload } from '@app-types/auth';
import {
  signAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  hashToken,
  refreshExpiresAt,
} from '@utils/tokens';

export class JwtTokenService implements ITokenService {
  signAccessToken(payload: AccessTokenPayload): string {
    return signAccessToken(payload);
  }
  verifyAccessToken(token: string): AccessTokenPayload {
    return verifyAccessToken(token);
  }
  generateRefreshToken(): string {
    return generateRefreshToken();
  }
  hashToken(token: string): string {
    return hashToken(token);
  }
  refreshExpiresAt(): Date {
    return refreshExpiresAt();
  }
}
