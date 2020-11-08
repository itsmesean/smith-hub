const jwt = require("jsonwebtoken");
const models = require("../../../sql/models");

async function isLoggedIn(req, res, next) {
  if (!req.cookies.jwt_token)
    return res.status(200).json({ isLoggedIn: false, login: "" });

  try {
    const { id, login } = jwt.verify(
      req.cookies.jwt_token,
      process.env.JWT_SECRET,
    );
    if (id) {
      const data = await models.User.findOne({ where: { id, login } });
      if (!data) return res.status(200).json({ isLoggedIn: false, login: "" });
      res.locals = { login, isLoggedIn: true };
      return next();
    }
    return res.status(200).json({ isLoggedIn: false, login: "" });
  } catch (err) {
    return next({
      log: `Error in middleware authController.isLoggedIn: ${err}`,
    });
  }
}

async function loginUser(req, res, next) {
  try {
    const payload = {
      id: res.locals.user.id,
      token: res.locals.user.token,
      login: res.locals.user.login,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("jwt_token", token, { httpOnly: true });
    return next();
  } catch (err) {
    return next({
      log: `Error in middleware authController.loginUser: ${err}`,
    });
  }
}

module.exports = {
  isLoggedIn,
  loginUser,
};
