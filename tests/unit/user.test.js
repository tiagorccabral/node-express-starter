const { User } = require('../../src/db/models');

describe('Test User model', () => {
  describe('User model validations', () => {
    test('user should be created correctly if all fields are correct', async () => {
      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@email.com',
        password: '123456',
      };

      const user = await User.create(userData);
      expect(user.dataValues.first_name).toBe(userData.first_name);
      expect(user.dataValues.last_name).toBe(userData.last_name);
      expect(user.dataValues.email).toBe(userData.email);
      expect(user.dataValues.password).toBe(userData.password);
      expect(user.dataValues.createdAt).toEqual(expect.any(Date));
      expect(user.dataValues.updatedAt).toEqual(expect.any(Date));
      expect(user.dataValues.id).toEqual(expect.any(Number));
    });

    test('user should not be created correctly if missing fields ', async () => {
      expect.assertions(1);

      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        password: '123456',
      };

      return User.create(userData).catch((err) => {
        expect(err).toBeTruthy();
      });
    });
  });
});
