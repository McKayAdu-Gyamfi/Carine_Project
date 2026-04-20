import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Users API Endpoints', () => {
  it('GET /api/users/me should require authentication', async () => {
    const res = await request(app).get('/api/users/me');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PATCH /api/users/me should require authentication', async () => {
    const res = await request(app).patch('/api/users/me').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PATCH /api/users/me/profile-complete should require authentication (STUDENT)', async () => {
    const res = await request(app).patch('/api/users/me/profile-complete').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('GET /api/users/me/hostels should require authentication (HOSTEL_MANAGER)', async () => {
    const res = await request(app).get('/api/users/me/hostels');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('GET /api/users should require authentication (ADMIN)', async () => {
    const res = await request(app).get('/api/users');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('POST /api/users should require authentication (ADMIN)', async () => {
    const res = await request(app).post('/api/users').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('GET /api/users/:id should require authentication (ADMIN)', async () => {
    const res = await request(app).get('/api/users/123');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PATCH /api/users/:id should require authentication (ADMIN)', async () => {
    const res = await request(app).patch('/api/users/123').send({});
    expect([401, 403]).toContain(res.statusCode);
  });
});
