import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Complaints API Endpoints', () => {
  it('GET /api/complaints should require authentication', async () => {
    const res = await request(app).get('/api/complaints');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('GET /api/complaints/:id should require authentication', async () => {
    const res = await request(app).get('/api/complaints/123');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('POST /api/complaints should require authentication', async () => {
    const res = await request(app).post('/api/complaints').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PATCH /api/complaints/:id should require authentication', async () => {
    const res = await request(app).patch('/api/complaints/123').send({});
    expect([401, 403]).toContain(res.statusCode);
  });
});
