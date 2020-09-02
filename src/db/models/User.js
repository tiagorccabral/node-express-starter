const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 6,
        },
      },
    },
    {
      tableName: 'users',
    }
  );

  User.emailIsTaken = async function (email) {
    const foundUser = await User.findOne({ where: { email } });
    return !!foundUser;
  };

  User.prototype.isPasswordMatch = async function (password, storedPassword) {
    const passwordMatch = await bcrypt.compare(password, storedPassword);
    return !passwordMatch;
  };

  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // eslint-disable-next-line no-param-reassign
    user.password = hashedPassword;
  });

  User.prototype.roles = function () {
    return 'admin';
  };

  return User;
};
