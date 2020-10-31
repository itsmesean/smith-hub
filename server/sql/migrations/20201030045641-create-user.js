module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      githubId: {
        type: Sequelize.INTEGER,
      },
      htmlUrl: {
        type: Sequelize.STRING,
      },
      login: {
        type: Sequelize.STRING,
      },
      avatarUrl: {
        type: Sequelize.STRING,
      },
      activity: {
        type: Sequelize.JSON,
      },
      prodStars: {
        type: Sequelize.JSON,
      },
      token: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
