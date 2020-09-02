const request = require('supertest');
const httpStatus = require('http-status');
const { API_VERSION } = require('../../src/utils/constants');

const app = require('../../src/app');

describe('Main routes', () => {
  describe('GET /', () => {
    test('should return 200 and the api version', async () => {
      const response = await request(app).get('/');
      const responseBody = response.body;

      expect(response.status).toBe(httpStatus.OK);
      expect(responseBody.apiVersion).toBe(API_VERSION);
    });
  });
});
