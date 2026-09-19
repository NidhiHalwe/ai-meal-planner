import request from 'supertest';
import express from 'express';
import { apiErrorResponse, asyncHandler } from '../utils/errorHandler.js';

const app = express();
app.use(express.json());

app.get('/throw', asyncHandler(async () => {
  throw new Error('Boom');
}));

app.get('/validation', (req, res) => {
  throw apiErrorResponse(400, 'VALIDATION_ERROR', 'Invalid request data');
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Unexpected server error';
  res.status(status).json({ success: false, error: { code, message } });
});

describe('API quality and error handling', () => {
  it('returns a consistent error envelope for validation failures', async () => {
    const response = await request(app).get('/validation');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
    expect(response.body.error.message).toContain('Invalid request data');
  });

  it('handles async errors via a centralized wrapper', async () => {
    const response = await request(app).get('/throw');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('INTERNAL_SERVER_ERROR');
  });
});
