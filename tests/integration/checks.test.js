const request = require('supertest');
const app = require('../../src/app');

describe('Health-check routes', () => {
  describe('GET v1/checks/health-check', () => {
    test('should return 200 and message confirming server is up', async () => {
      const response = await request(app).get('/v1/checks/health-check');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('The server is up and running!');
    });
  });
});
