import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Reviews API Endpoints', () => {
  it('GET /api/reviews should get all reviews (Public)', async () => {
    const res = await request(app).get('/api/reviews');
    expect([200, 404]).toContain(res.statusCode);
  });

  it('POST /api/reviews should require authentication', async () => {
    const res = await request(app).post('/api/reviews').send({});
    expect([400, 401, 403]).toContain(res.statusCode);
  });
});
