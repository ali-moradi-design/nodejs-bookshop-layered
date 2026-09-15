import { describe, expect, it } from 'vitest';
import { Money } from '../../../src/utils/Money';
import { normalizeEmail } from '../../../src/utils/Email';
import { normalizeIsbn, isValidIsbn } from '../../../src/utils/Isbn';
import { DomainError } from '../../../src/utils/DomainError';

describe('value helpers', () => {
  it('Money rounds and subtracts', () => {
    expect(Money.of(10.125).amount).toBe(10.13);
    expect(Money.of(10).subtract(Money.of(3)).amount).toBe(7);
  });

  it('Email / ISBN', () => {
    expect(normalizeEmail('  A@B.COM ')).toBe('a@b.com');
    expect(() => normalizeEmail('bad')).toThrow(DomainError);
    expect(isValidIsbn('978-0-13-235088-4')).toBe(true);
    expect(normalizeIsbn('9780132350884')).toBe('9780132350884');
  });
});
