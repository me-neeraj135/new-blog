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
import EditArticle from "./EditArticle";
import axios from "axios";
import { localStorageKey, verifyUserURL } from "../Apis/constant";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };
  updatedUser = user => {
    localStorage.setItem(localStorageKey, JSON.stringify(user.user.token));
    this.setState({ isLoggedIn: true, user, isVerifying: false });
  };
  componentDidMount() {
    let token = localStorage[localStorageKey]
      ? JSON.parse(localStorage[localStorageKey])
      : "";

    if (token) {
      fetch(verifyUserURL, {
        method: "GET",
        headers: {
          authorization: `${token}`,
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ error }) => {
            return Promise.reject(error);
          });
        })
        .then(user => {
          this.updatedUser(user);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ isVerifying: false });
    }
  }

  render() {
    const { isLoggedIn, user } = this.state;
    if (this.state.isVerifying) {
      return <FullLoader />;
    }
    return (
      <>
        <Header isLoggedIn={isLoggedIn} user={user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp user={user} />
        ) : (
          <UnAuthenticatedApp updatedUser={this.updatedUser} user={user} />
        )}
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />

      <Route path="/new-post" element={<NewPost user={props.user} />} />
      <Route path="/profile" element={<Profile user={props.user} />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/article/:slug" element={<SinglePost user={props.user} />} />
      <Route path="/edit/article" element={<EditArticle user={props.user} />} />

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
      <Route path="/article/:slug" element={<SinglePost user={props.user} />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
