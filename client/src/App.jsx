import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login/Login";
import Main from "./containers/Main";
import Header from "./containers/Header";
import Footer from "./containers/Footer";

function App() {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    userId: "",
    userName: "",
    login: "",
    htmlUrl: "",
    activity: "",
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
      prodStars: data.prodStars,
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
    return <Login />;
  }

  return (
    <div className="wrapper">
      <Header />
      <Main userState={userState} setUserData={SET_USER_DATA} logout={LOGOUT} />
      <Footer />
    </div>
  );
}

export default App;
