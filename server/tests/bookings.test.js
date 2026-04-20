import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Bookings API Endpoints', () => {
  it('GET /api/bookings should require authentication', async () => {
    const res = await request(app).get('/api/bookings');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('GET /api/bookings/:id should require authentication', async () => {
    const res = await request(app).get('/api/bookings/123');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('POST /api/bookings should require authentication', async () => {
    const res = await request(app).post('/api/bookings').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PATCH /api/bookings/:id should require authentication', async () => {
    const res = await request(app).patch('/api/bookings/123').send({});
    expect([401, 403]).toContain(res.statusCode);
  });
});
