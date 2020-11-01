import React, { useState, useEffect } from "react";
import axios from "axios";

import Main from "./containers/Main";
import Nav from "./containers/Nav";

function App() {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    userId: "",
    userName: "",
    login: "",
    htmlUrl: "",
    activity: "",
  });

  const [logoState, setlogoState] = useState({
    open: true,
  });

  function LOGIN() {
    setUserState({
      ...userState,
      isLoggedIn: true,
    });
  }

  function LOGOUT() {
    setUserState({
      isLoggedIn: false,
      userId: "",
      userName: "",
      login: "",
      htmlUrl: "",
      activity: "",
    });
  }

  function SET_USER_DATA(data) {
    setUserState({
      ...userState,
      userId: data.id,
      userName: data.name,
      login: data.login,
      htmlUrl: data.htmlUrl,
      activity: data.activity,
    });
  }

  useEffect(() => {
    axios
      .get("/api/auth/verify")
      .then(({ data }) => {
        if (!data.isLoggedIn) {
          return LOGOUT();
        }
        return LOGIN();
      })
      .catch((err) => console.log(err));
  }, []);

  if (!userState.isLoggedIn) {
    return (
      <div className="grid">
        <img src="assets/csLogo.png" alt="" className="logo" />
        <div className="container container__login">
          <form className="login__form" method="GET" action="/api/auth/oauth">
            <button className="btn__login" type="submit">
              <div className="container">
                <div className="container github__logo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    width="24"
                    height="24"
                  >
                    <path
                      strokeWidth="0"
                      fill="currentColor"
                      d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z"
                    />
                  </svg>
                </div>
                <div className="github__login">GitHub Login</div>
              </div>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <Main userState={userState} setUserData={SET_USER_DATA} logout={LOGOUT} />
    </div>
  );
}

export default App;
