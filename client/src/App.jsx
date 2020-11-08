import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login/Login";
import Main from "./containers/Main";
import Header from "./containers/Header";
import Footer from "./containers/Footer";

function App() {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    login: "",
  });

  function LOGIN(data) {
    setUserState(data);
  }

  function LOGOUT() {
    setUserState({
      isLoggedIn: false,
      login: "",
    });
  }

  useEffect(() => {
    axios
      .get("/api/auth/verify")
      .then(({ data }) => {
        if (!data.isLoggedIn) {
          return LOGOUT();
        }
        return LOGIN(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (userState.isLoggedIn === false) {
    return <Login />;
  }

  return (
    <div className="wrapper">
      <Header />
      <Main curUser={userState.login} />
      <Footer />
    </div>
  );
}

export default App;
