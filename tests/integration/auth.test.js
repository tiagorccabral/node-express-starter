const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../../src/app');
const { User } = require('../../src/db/models');

const { dummyUser } = require('../dummies/user');

describe('Auth routes', () => {
  afterEach(async () => {
    await User.destroy({
      truncate: true,
    });
  });

  afterAll(async () => {
    await User.destroy({
      truncate: true,
    });
  });

  describe('POST v1/auth/register', () => {
    test('should return 201 if correct user data is provided', async () => {
      const response = await request(app).post('/v1/auth/register').send(dummyUser);

      const responseBody = response.body.user;

      expect(response.status).toBe(httpStatus.CREATED);
      expect(responseBody.first_name).toBe(dummyUser.first_name);
      expect(responseBody.last_name).toBe(dummyUser.last_name);
      expect(responseBody.email).toBe(dummyUser.email);
      expect(responseBody.password).toEqual(expect.anything());
      expect(responseBody.id).toEqual(expect.any(Number));
    });

    test('should not create if e-mail is taken and return 400 status', async () => {
      await User.create(dummyUser);
      const response = await request(app).post('/v1/auth/register').send(dummyUser);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  describe('POST v1/auth/login', () => {
    test('should return 201 and token if correct email and password are provided', async () => {
      await request(app).post('/v1/auth/register').send(dummyUser);

      const response = await request(app)
        .post('/v1/auth/login')
        .send({ email: dummyUser.email, password: dummyUser.password });

      const responseBody = response.body.user;
      const responseToken = response.body.token;

      expect(response.status).toBe(httpStatus.OK);
      expect(responseBody.first_name).toBe(dummyUser.first_name);
      expect(responseBody.last_name).toBe(dummyUser.last_name);
      expect(responseBody.email).toBe(dummyUser.email);
      expect(responseBody.password).toEqual(expect.anything());
      expect(responseBody.id).toEqual(expect.any(Number));

      expect(responseToken).toEqual(expect.any(Object));
      expect(responseToken.access).toEqual(expect.any(Object));
      expect(responseToken.access.token).toEqual(expect.any(String));
    });

    test('should return 401 if wrong email and/or password are provided', async () => {
      await request(app).post('/v1/auth/register').send(dummyUser);

      const response = await request(app)
        .post('/v1/auth/login')
        .send({ email: 'wrongemail@email.com', password: dummyUser.password });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
});
