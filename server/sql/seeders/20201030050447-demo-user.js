module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          githubId: 1234567,
          htmlUrl: "google.com",
          login: "samash88",
          avatarUrl: "google.com",
          activity: "[1, 2, 3, 1, 2, 3, 1, 2, 3, 1]",
          prodStars: "[1, 0, 0, 1, 0, 0, 1, 0, 0, 1]",
          token: "asdfdasfasdfg",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
