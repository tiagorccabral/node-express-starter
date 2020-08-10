module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('User');
  },
};
