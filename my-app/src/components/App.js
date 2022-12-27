/** @format */
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import FullLoader from "./FullLoader";
import Header from "./Header";
import Error from "./Error";
import SinglePost from "./SinglePost";
import NewPost from "./NewPost";
import Profile from "./Profile";
import Setting from "./Setting";
import { localStorageKey, verifyUser } from "../Apis/constant";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  componentDidMount() {
    let key = localStorage[localStorageKey];
    if (key) {
      fetch(verifyUser, {
        method: "GET",
        headers: {
          authorization: `Token${key}`,
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          res.json().then(({ error }) => {
            return Promise.reject(error);
          });
        })
        .then(user => this.updatedUser(user))
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ isVerifying: false });
    }
  }
  updatedUser = user => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };
  render() {
    const { isLoggedIn, user } = this.state;
    if (this.state.isVerifying) {
      return <FullLoader />;
    }
    return (
      <>
        <Header isLoggedIn={isLoggedIn} user={user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp />
        ) : (
          <UnAuthenticatedApp updatedUser={this.updatedUser} />
        )}
      </>
    );
  }
}

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />

      <Route path="/new-post" element={<NewPost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/article/:slug" element={<SinglePost />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
function UnAuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route
        path="/signup"
        element={<Signup updatedUser={props.updatedUser} />}
      />
      <Route
        path="/login"
        element={<Login updatedUser={props.updatedUser} />}
      />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
