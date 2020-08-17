const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../../src/app');
const { User } = require('../../src/db/models');

const { dummyUser } = require('../dummies/user');

describe('User routes', () => {
  afterAll(async () => {
    await User.destroy({
      truncate: true,
    });
  });
  describe('GET v1/users/', () => {
    afterAll(async () => {
      await User.destroy({
        truncate: true,
      });
    });
    test('should return 200 and user list', async () => {
      await User.create(dummyUser);
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

  describe('POST v1/users/', () => {
    test('should return 201 and created user data', async () => {
      const response = await request(app).post('/v1/users').send(dummyUser);

      const responseBody = response.body;

      expect(response.status).toBe(httpStatus.CREATED);
      expect(responseBody.first_name).toBe(dummyUser.first_name);
      expect(responseBody.last_name).toBe(dummyUser.last_name);
      expect(responseBody.email).toBe(dummyUser.email);
      expect(responseBody.password).toBe(dummyUser.password);
      expect(responseBody.id).toEqual(expect.any(Number));
    });

    test('should not create if e-mail is taken and return 400 status', async () => {
      const response = await request(app).post('/v1/users').send(dummyUser);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
});
