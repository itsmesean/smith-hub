const jwt = require("jsonwebtoken");

const models = require("../../../sql/models");

async function getAll(req, res, next) {
  const users = await models.User.findAll();
  res.locals.userList = users;
  return next();
}
async function getData(req, res, next) {
  const { id } = jwt.verify(req.cookies.jwt_token, process.env.JWT_SECRET);
  const data = await models.User.findOne({ where: { id } });
  res.locals.user = data;
  return next();
}

async function create(req, res, next) {
  try {
    const [user, created] = await models.User.findOrCreate({
      where: { githubId: res.locals.userData.githubId },
      defaults: {
        name: res.locals.userData.name,
        githubId: res.locals.userData.githubId,
        htmlUrl: res.locals.userData.htmlUrl,
        login: res.locals.userData.login,
        avatarUrl: res.locals.userData.avatarUrl,
        activity: res.locals.activity,
        prodStars: res.locals.prodStars,
        token: res.locals.token,
      },
    });
    if (user) {
      console.log("Created: ", created);
      res.locals.userData.id = user.id;
      return next();
    }
  } catch (err) {
    return next({
      log: `Error in middleware authController.loginUser: ${err}`,
    });
  }
  return null;
}

module.exports = {
  getAll,
  getData,
  create,
};
