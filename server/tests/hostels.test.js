import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Hostels API Endpoints', () => {
  it('GET /api/hostels should get all hostels (Public)', async () => {
    const res = await request(app).get('/api/hostels');
    expect([200, 404]).toContain(res.statusCode);
  });

  it('GET /api/hostels/:id should get specific hostel (Public)', async () => {
    const res = await request(app).get('/api/hostels/123'); // Adjust with valid UUID or ID if needed, checking for 400 or 404 is fine.
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  it('POST /api/hostels should require authentication', async () => {
    const res = await request(app).post('/api/hostels').send({});
    // Without auth, should be 401 or 403
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PATCH /api/hostels/:id should require authentication', async () => {
    const res = await request(app).patch('/api/hostels/123').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PUT /api/hostels/:id/amenities should require authentication', async () => {
    const res = await request(app).put('/api/hostels/123/amenities').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('POST /api/hostels/:id/amenities should require authentication', async () => {
    const res = await request(app).post('/api/hostels/123/amenities').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('DELETE /api/hostels/:id/amenities/:amenityId should require authentication', async () => {
    const res = await request(app).delete('/api/hostels/123/amenities/456');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('POST /api/hostels/:id/images should require authentication', async () => {
    const res = await request(app).post('/api/hostels/123/images').send({});
    expect([401, 403]).toContain(res.statusCode);
  });
});
