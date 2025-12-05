import type { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.config.js';

export function setupSwagger(app: Express): void {
  // Express 5 compatibility: swaggerUi.serve returns an array of middleware
  // We need to spread it and handle the setup middleware correctly
  app.use(
    '/api-docs',
    ...(swaggerUi.serve as any),
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'ShopAuto API Documentation',
    }) as any,
  );

  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
