const axios = require("axios");

async function token(req, res, next) {
  axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: `${
          process.env.NODE_ENV === "production"
            ? process.env.CLIENT_ID
            : process.env.CLIENT_ID_DEV
        }`,
        client_secret: `${
          process.env.NODE_ENV === "production"
            ? process.env.CLIENT_SECRET
            : process.env.CLIENT_SECRET_DEV
        }`,
        code: req.query.code,
      },
      {
        headers: {
          accept: "application/json",
        },
      },
    )
    .then((githubRes) => {
      res.locals.user = { token: githubRes.data.access_token };
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in middleware githubController.token: ${err}`,
      }),
    );
}

async function userData(req, res, next) {
  axios
    .get("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${res.locals.user.token}`,
      },
    })
    .then(({ data: { id, name, html_url, login, avatar_url, created_at } }) => {
      res.locals.user = {
        ...res.locals.user,
        githubId: id,
        name,
        html_url,
        login,
        avatar_url,
        created_at,
      };
      return next();
    })
    .catch((err) => ({
      log: `Error in middleware githubController.userData: ${err}`,
    }));
}

async function userActivity(req, res, next) {
  const d = new Date();
  const now = new Date();
  d.setDate(d.getDate() - 9);
  const body = {
    query: `query { 
      user(login: "${res.locals.user.login}") {
        contributionsCollection(from:"${d.toISOString()}", to:"${now.toISOString()}") {
          contributionCalendar{
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }  
    }`,
  };

  axios({
    method: "post",
    url: "https://api.github.com/graphql",
    headers: { Authorization: `token ${res.locals.user.token}` },
    data: JSON.stringify(body),
  })
    .then(({ data }) => {
      const {
        weeks,
      } = data.data.user.contributionsCollection.contributionCalendar;
      const arr = [];
      weeks.map((week) =>
        week.contributionDays.map((day) => {
          return arr.push({ date: day.date, count: day.contributionCount });
        }),
      );
      res.locals.user.activity = arr;
      return next();
    })
    .catch((err) => ({
      log: `Error in middleware githubController.userData: ${err}`,
    }));
}

async function PPstars(req, res, next) {
  const urls = [
    "https://api.github.com/user/starred/open-source-labs/reactime",
    "https://api.github.com/user/starred/open-source-labs/SeeQR",
    "https://api.github.com/user/starred/open-source-labs/Recoilize",
    "https://api.github.com/user/starred/open-source-labs/Chromogen",
    "https://api.github.com/user/starred/oslabs-beta/Aqls-client",
    "https://api.github.com/user/starred/oslabs-beta/GatsbyHub",
    "https://api.github.com/user/starred/oslabs-beta/irisql",
    "https://api.github.com/user/starred/oslabs-beta/StratosDB",
  ];

  const promiseArray = urls.map((url) => {
    return axios({
      method: "get",
      url,
      headers: {
        Authorization: `token ${res.locals.user.token}`,
      },
    });
  });

  axios
    .all(promiseArray.map((p) => p.catch(() => undefined)))
    .then((results) => {
      const items = results.map((bool) => (bool ? 1 : 0));
      res.locals.user.prodStars = items;
      return next();
    });
}

async function starAll(req, res, next) {
  const urls = [
    "https://api.github.com/user/starred/open-source-labs/reactime",
    "https://api.github.com/user/starred/open-source-labs/SeeQR",
    "https://api.github.com/user/starred/open-source-labs/Recoilize",
    "https://api.github.com/user/starred/open-source-labs/Chromogen",
    "https://api.github.com/user/starred/oslabs-beta/Aqls-client",
    "https://api.github.com/user/starred/oslabs-beta/GatsbyHub",
    "https://api.github.com/user/starred/oslabs-beta/irisql",
    "https://api.github.com/user/starred/oslabs-beta/StratosDB",
  ];

  const promiseArray = urls.map((url) => {
    return axios({
      method: "put",
      url,
      headers: {
        Authorization: `token ${res.locals.user.token}`,
        "Content-Length": 0,
      },
    });
  });

  axios
    .all(promiseArray.map((p) => p.catch(() => undefined)))
    .then((results) => {
      const items = results.map((bool) => bool);
      return next();
    });
}

async function userStats(req, res, next) {
  const user = res.locals.user.login;
  const urls = [
    `https://api.github.com/search/commits?q=author:${user}`,
    `https://api.github.com/search/issues?q=is:pr+author:${user}`,
    `https://api.github.com/users/${user}/starred`,
  ];
  const promiseArray = urls.map((url) => {
    return axios({
      method: "get",
      url,
      headers: {
        "content-type": "application/json",
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `bearer ${res.locals.user.token}`,
      },
    });
  });
  axios
    .all(promiseArray.map((p) => p.catch(() => undefined)))
    .then((results) => {
      return results.map((data) => {
        return data;
      });
    })
    .then((items) => {
      for (let i = 0; i < items.length; i += 1) {
        const { url } = items[i].config;
        switch (true) {
          case url.includes("issues"):
            res.locals.user.totalPRs = items[i].data.total_count;
            break;
          case url.includes("commits"):
            res.locals.user.totalCommits = items[i].data.total_count;
            break;
          case url.includes("starred"):
            res.locals.user.starsGiven = items[i].data.map((repo) => repo.id);
            break;
          default:
            console.log(`Sorry`);
        }
      }

      return next();
    })
    .catch((err) => ({
      log: `Error in middleware githubController.userStats: ${err}`,
    }));
}

module.exports = {
  token,
  userData,
  userActivity,
  PPstars,
  starAll,
  userStats,
};
