/** @format */
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";
import Error from "./Error";
import SinglePost from "./SinglePost";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/article/:slug" element={<SinglePost />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </>
    );
  }
}

export default App;
