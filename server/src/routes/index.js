const { Router } = require("express");

const {
  authController,
  userController,
  githubController,
} = require("./controllers");

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
      ? "https://smith-hub.com/api/auth/callback&"
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
  githubController.userStats,
  githubController.userActivity,
  githubController.PPstars,
  userController.create,
  authController.loginUser,
  (req, res) => {
    res.redirect("/");
  },
);

router.get(
  "/starAll",
  authController.isLoggedIn,
  userController.getData,
  githubController.starAll,
  (req, res) => {
    return res.redirect("/api/update");
  },
);

router.get(
  "/update",
  authController.isLoggedIn,
  userController.getData,
  githubController.userActivity,
  githubController.PPstars,
  userController.update,
  userController.getAll,
  (req, res) => {
    return res.status(200).json(res.locals);
  },
);

router.get(
  "/test",
  userController.getData,
  githubController.userStats,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  },
);

router.get("/auth/verify", authController.isLoggedIn, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
