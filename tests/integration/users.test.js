const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../../src/app');
const { User } = require('../../src/db/models');

const { dummyUser } = require('../dummies/user');

const { tokenService } = require('../../src/services');

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
      expect(responseBody.password).toEqual(expect.anything());
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
      expect(responseBody.password).toEqual(expect.anything());
      expect(responseBody.id).toEqual(expect.any(Number));
    });

    test('should not create if e-mail is taken and return 400 status', async () => {
      const response = await request(app).post('/v1/users').send(dummyUser);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET v1/users/:userId', () => {
    let user;
    let user2;
    let response;
    let token;
    beforeAll(async () => {
      user = await User.create(dummyUser);
      user2 = await User.create({
        first_name: 'Mock2',
        last_name: 'John2',
        email: 'mockjohn2@email.com',
        password: '123456',
      });
      token = `Bearer ${(await tokenService.generateAuthTokens(user)).access.token}`;
    });
    afterAll(async () => {
      await User.destroy({
        truncate: true,
      });
    });
    describe('when the user requests its on profile', () => {
      beforeAll(async () => {
        response = await request(app).get(`/v1/users/${user.id}`).set('authorization', token);
      });
      it('should return 200', async () => {
        expect(response.status).toBe(httpStatus.OK);
      });
      it('should return the user attributes', async () => {
        const responseBody = response.body;

        expect(responseBody.first_name).toBe(dummyUser.first_name);
        expect(responseBody.last_name).toBe(dummyUser.last_name);
        expect(responseBody.email).toBe(dummyUser.email);
        expect(responseBody.password).toEqual(expect.anything());
        expect(responseBody.id).toEqual(expect.any(Number));
      });
    });
    describe('when the user requests other user profile', () => {
      beforeAll(async () => {
        response = await request(app).get(`/v1/users/${user2.id}`).set('authorization', token);
      });
      it('should return 401 and an error message', async () => {
        const responseBody = response.body;

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        expect(responseBody.message).toEqual('You can only access your own content');
      });
    });
  });
});
