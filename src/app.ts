import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { env, resolveCorsOrigin } from '@config/env';
import { openApiSpec } from '@docs/openapi';
import { errorHandler, notFoundHandler } from '@middleware/errorHandler';
import { requestIdMiddleware } from '@middleware/requestId';
import { globalRateLimiter } from '@middleware/security/rate-limit';
import apiV1Routes from '@routes/index';

const app = express();

app.use(requestIdMiddleware);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: resolveCorsOrigin(),
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

if (env.NODE_ENV !== 'test') {
  app.use(globalRateLimiter);
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.get('/api/docs.json', (_req, res) => {
  res.json(openApiSpec);
});

app.use('/uploads', express.static(env.UPLOAD_DIR_ABS));

app.use('/api/v1', apiV1Routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
