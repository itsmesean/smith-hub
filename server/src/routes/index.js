const { Router } = require("express");

const { authController } = require("./controllers");
const { userController } = require("./controllers");
const { githubController } = require("./controllers");

const router = Router();

router.get(
  "/user",
  authController.isLoggedIn,
  userController.getData,
  userController.getAll,
  (req, res) => {
    return res.send(res.locals);
  },
);

router.get("/auth/oauth", (req, res) => {
  const root =
    process.env.NODE_ENV === "production"
      ? "https://smith-hub.herokuapp.com/api/auth/callback&"
      : `http://localhost:8080/api/auth/callback&`;

  const url =
    "https://github.com/login/oauth/authorize?" +
    "scope=user,repo&" +
    `redirect_uri=${root}` +
    `client_id=${
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_ID
        : process.env.CLIENT_ID_DEV
    }`;

  return res.redirect(url);
});

router.get(
  "/auth/callback",
  githubController.token,
  githubController.userData,
  githubController.userActivity,
  githubController.PPstars,
  userController.create,
  authController.loginUser,
  (req, res) => {
    res.redirect("/");
  },
);

router.get("/auth/verify", authController.isLoggedIn, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
