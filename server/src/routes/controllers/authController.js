const jwt = require("jsonwebtoken");

async function isLoggedIn(req, res, next) {
  try {
    jwt.verify(req.cookies.jwt_token, process.env.JWT_SECRET, (err, data) => {
      if (err) return res.status(200).json({ isLoggedIn: false });
      res.locals = { isLoggedIn: true };
      return next();
    });
  } catch (err) {
    return next({
      log: `Error in middleware authController.isLoggedIn: ${err}`,
    });
  }
  return null;
}

async function loginUser(req, res, next) {
  try {
    const payload = { id: res.locals.user.id };
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
