import React, { useState, useEffect } from "react";
import axios from "axios";

import UserCard from "../components/Cards/UserCard";

function Main({ setUserData, logout, userState }) {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/user")
      .then(({ data }) => {
        if (!data.isLoggedIn) {
          return logout();
        }
        setUserList(data.userList);
        setUserData(data.user);
        return true;
      })
      .catch((err) => console.log(err));
  }, []);
  function starAll() {
    axios
      .get("/api/starAll")
      .then(({ data }) => {
        if (data) {
          window.location.reload(false);
          return null;
        }
        console.log("Nothing to Star");
        return null;
      })
      .catch((err) => console.log(err));
  }
  console.log(userList);
  const users = userList.map((user, i) => {
    return (
      <UserCard
        name={user.name}
        login={user.login}
        url={user.htmlUrl}
        avatarUrl={user.avatarUrl}
        activity={user.activity}
        prodStars={user.prodStars}
        key={i}
        starAll={starAll}
      />
    );
  });

  return <main className="content">{users}</main>;
}

export default Main;
