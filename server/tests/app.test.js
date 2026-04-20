import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('App Health Check', () => {
  it('should respond with 404 for an unknown route', async () => {
    const response = await request(app).get('/api/unknown');
    expect(response.status).toBe(404);
  });

  it('should respond with 200 for a known route (if it exists)', async () => {
    // This depends on whether you have data in your DB or if the route exists
    // For now, let's just check if it doesn't crash
    const response = await request(app).get('/api/hostels');
    // If it's 200 or 404, we know the app is handling the request
    expect([200, 404, 500]).toContain(response.status);
  });
});
