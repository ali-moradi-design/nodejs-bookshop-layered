import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'src_ddd_backup/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      // Classic N-tier: controllers must not import models/repositories directly
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@models/*', '**/models/**'],
              message: 'Controllers/routes should not import models; use services.',
            },
          ],
        },
      ],
    },
  },
  {
    // Allow models imports in repositories, services (via repos), seed, container
    files: [
      'src/repositories/**/*.ts',
      'src/models/**/*.ts',
      'src/scripts/**/*.ts',
      'src/container/**/*.ts',
      'src/services/**/*.ts',
    ],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
);
