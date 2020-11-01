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
      />
    );
  });

  return (
    <div className="main">
      <div className="card_container">{users}</div>
      <div className="marginL" />
      <div className="marginR" />
    </div>
  );
}

export default Main;
