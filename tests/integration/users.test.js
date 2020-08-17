const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../../src/app');
const { User } = require('../../src/db/models');

const { dummyUser } = require('../dummies/user');

describe('User routes', () => {
  beforeAll(async () => {
    await User.create(dummyUser);
  });
  describe('GET v1/users/', () => {
    test('should return 200 and user list', async () => {
      const response = await request(app).get('/v1/users');

      const responseBody = response.body[0];

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toHaveLength(1);
      expect(responseBody.first_name).toBe(dummyUser.first_name);
      expect(responseBody.last_name).toBe(dummyUser.last_name);
      expect(responseBody.email).toBe(dummyUser.email);
      expect(responseBody.password).toBe(dummyUser.password);
      expect(responseBody.id).toEqual(expect.any(Number));
    });
  });
});
