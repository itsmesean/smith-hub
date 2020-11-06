import React, { useState, useEffect } from "react";
import axios from "axios";

import UserCard from "../components/Cards/UserCard";

function Main({ curUser }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user")
      .then(({ data }) => {
        if (data) {
          setUserList(data.userList);
          return true;
        }
        return true;
      })
      .catch((err) =>
        console.log(err, "Problem getting users list in Main.jsx"),
      );
  }, []);

  function starAll() {
    axios
      .get("/api/starAll")
      .then(({ data }) => {
        if (data) {
          window.location.reload(false);
          return true;
        }
        return true;
      })
      .catch((err) => console.log(err, "Problem doing starAll in Main.jsx"));
  }

  const users = userList.map((user) => {
    return (
      <UserCard
        auth={curUser === user.login}
        name={user.name}
        login={user.login}
        url={user.htmlUrl}
        avatarUrl={user.avatarUrl}
        activity={user.activity}
        prodStars={user.prodStars}
        totalCommits={user.totalCommits}
        totalPRs={user.totalPRs}
        starsGiven={user.starsGiven}
        createdAt={(
          (new Date() - Date.parse(user.createdAt)) /
          1000 /
          60 /
          60 /
          24
        ).toFixed()}
        key={user.login}
        starAll={starAll}
      />
    );
  });
  return <main className="content">{users}</main>;
}

export default Main;
