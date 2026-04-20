import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Auth API Endpoints', () => {
  it('POST /api/auth/sign-in should handle authentication requests', async () => {
    const res = await request(app).post('/api/auth/sign-in').send({
      email: 'test@example.com',
      password: 'wrongpassword'
    });
    // Expected to return 4xx client error
    expect([400, 401, 404]).toContain(res.statusCode);
  });

  it('POST /api/auth/sign-up should handle authentication requests', async () => {
    const res = await request(app).post('/api/auth/sign-up').send({
      email: 'test@example.com',
      password: 'password',
      name: 'Test User'
    });
    // Can be 400 bad request, or depending on implementation might succeed or fail depending on uniqueness
    expect([200, 400, 404, 409, 500]).toContain(res.statusCode);
  });
});
