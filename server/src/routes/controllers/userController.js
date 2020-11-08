const jwt = require("jsonwebtoken");

const models = require("../../../sql/models");

async function getAll(req, res, next) {
  try {
    const users = await models.User.findAll();
    res.locals.userList = users;
    return next();
  } catch (err) {
    return next({
      log: `Error in middleware userController.getAll: ${err}`,
    });
  }
}
async function getCredentials(req, res, next) {
  try {
    const { id, token, login } = jwt.verify(
      req.cookies.jwt_token,
      process.env.JWT_SECRET,
    );
    const data = await models.User.findOne({ where: { id, login } });
    res.locals.user = data;
    res.locals.user.token = token;
    return next();
  } catch (err) {
    return next({
      log: `Error in middleware userController.getCredentials: ${err}`,
    });
  }
}

async function update(req, res, next) {
  try {
    const user = await models.User.update(
      {
        activity: res.locals.user.activity,
        prodStars: res.locals.user.prodStars,
        totalCommits: res.locals.user.totalCommits,
        totalPRs: res.locals.user.totalPRs,
        starsGiven: res.locals.user.starsGiven,
      },
      {
        where: { githubId: res.locals.user.githubId },
      },
    );
    if (user) {
      return next();
    }
  } catch (err) {
    return next({
      log: `Error in middleware authController.loginUser: ${err}`,
    });
  }
  return null;
}

async function create(req, res, next) {
  try {
    const [user, created] = await models.User.findOrCreate({
      where: { githubId: res.locals.user.githubId },
      defaults: {
        name: res.locals.user.name,
        githubId: res.locals.user.githubId,
        htmlUrl: res.locals.user.html_url,
        login: res.locals.user.login,
        avatarUrl: res.locals.user.avatar_url,
        activity: res.locals.user.activity,
        prodStars: res.locals.user.prodStars,
        totalCommits: res.locals.user.totalCommits,
        totalPRs: res.locals.user.totalPRs,
        starsGiven: res.locals.user.starsGiven,
        createdAt: res.locals.user.created_at,
      },
    });
    if (user) {
      res.locals.user.id = user.id;
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
  getCredentials,
  create,
  update,
};
