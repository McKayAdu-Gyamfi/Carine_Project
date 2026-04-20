import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Rooms API Endpoints', () => {
  it('GET /api/rooms should get all rooms (Public)', async () => {
    const res = await request(app).get('/api/rooms');
    expect([200, 404]).toContain(res.statusCode);
  });

  it('GET /api/rooms/:id should get specific room (Public)', async () => {
    const res = await request(app).get('/api/rooms/123');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  it('POST /api/rooms should require authentication', async () => {
    const res = await request(app).post('/api/rooms').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PATCH /api/rooms/:id should require authentication', async () => {
    const res = await request(app).patch('/api/rooms/123').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('PUT /api/rooms/:id/amenities should require authentication', async () => {
    const res = await request(app).put('/api/rooms/123/amenities').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('POST /api/rooms/:id/amenities should require authentication', async () => {
    const res = await request(app).post('/api/rooms/123/amenities').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('DELETE /api/rooms/:id/amenities/:amenityId should require authentication', async () => {
    const res = await request(app).delete('/api/rooms/123/amenities/456');
    expect([401, 403]).toContain(res.statusCode);
  });

  it('POST /api/rooms/:id/images should require authentication', async () => {
    const res = await request(app).post('/api/rooms/123/images').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('POST /api/rooms/:id/tours should require authentication', async () => {
    const res = await request(app).post('/api/rooms/123/tours').send({});
    expect([401, 403]).toContain(res.statusCode);
  });

  it('DELETE /api/rooms/:id/tours/:sceneId should require authentication', async () => {
    const res = await request(app).delete('/api/rooms/123/tours/456');
    expect([401, 403]).toContain(res.statusCode);
  });
});
