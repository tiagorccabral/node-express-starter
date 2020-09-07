const request = require('supertest');
const httpStatus = require('http-status');
const { API_VERSION } = require('../../src/utils/constants');

const { User } = require('../../src/db/models');

const { dummyUser } = require('../dummies/user');

const { tokenService } = require('../../src/services');

const app = require('../../src/app');

describe('Main routes', () => {
  describe('GET /', () => {
    it('should return 200 and the api version', async () => {
      const response = await request(app).get('/');
      const responseBody = response.body;

      expect(response.status).toBe(httpStatus.OK);
      expect(responseBody.apiVersion).toBe(API_VERSION);
    });
  });

  describe('GET /admin', () => {
    let response;
    describe('when the user is an admin', () => {
      beforeAll(async () => {
        const user = await User.create(dummyUser); // user is mocked with admin role when created
        const token = `Bearer ${(await tokenService.generateAuthTokens(user)).access.token}`;
        response = await request(app).get('/admin').set('authorization', token);
      });
      it('should return 200', async () => {
        expect(response.status).toBe(httpStatus.OK);
      });
      it('shoud return the sample message', async () => {
        const responseBody = response.body;
        expect(responseBody.message).toBe('This is a sample admin route');
      });
    });

    describe('when the user is not an admin', () => {
      beforeAll(async () => {
        response = await request(app).get('/admin');
      });
      it('should return 401', async () => {
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    });
  });
});
