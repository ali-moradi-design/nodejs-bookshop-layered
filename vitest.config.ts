import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, 'src/config'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@repositories': path.resolve(__dirname, 'src/repositories'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@middleware': path.resolve(__dirname, 'src/middleware'),
      '@validators': path.resolve(__dirname, 'src/validators'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@app-types': path.resolve(__dirname, 'src/types'),
      '@docs': path.resolve(__dirname, 'src/docs'),
      '@container': path.resolve(__dirname, 'src/container'),
    },
  },
  test: {
    globals: false,
    environment: 'node',
    setupFiles: ['./tests/setup-env.ts'],
    fileParallelism: false,
    sequence: { concurrent: false },
    testTimeout: 60_000,
    hookTimeout: 120_000,
    include: ['tests/**/*.test.ts'],
  },
});
