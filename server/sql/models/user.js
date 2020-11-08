const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      githubId: DataTypes.INTEGER,
      htmlUrl: DataTypes.STRING,
      login: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
      activity: DataTypes.JSON,
      prodStars: DataTypes.JSON,
      totalCommits: DataTypes.INTEGER,
      totalPRs: DataTypes.INTEGER,
      starsGiven: DataTypes.ARRAY(DataTypes.INTEGER),
      createdAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    },
  );
  return User;
};
