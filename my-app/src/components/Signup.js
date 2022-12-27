/** @format */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import isValid from "../validation/validate";
import { signupURL } from "../Apis/constant";

class Signup extends Component {
  state = {
    username: ``,
    email: ``,
    password: ``,
    error: {
      username: ``,
      email: ``,
      password: ``,
    },
  };

  handleChange = e => {
    let { name, value } = e.target;
    let { error } = { ...this.state };
    isValid(name, value, error);
    this.setState({ error, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    fetch(signupURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
      .then(res => {
        if (!res.ok) {
          console.log(res, `ok`);
          res.json().then(({ error }) => {
            return Promise.reject(error);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updatedUser(user);
        this.setState({ username: "", email: "", password: "", error: "" });
      })
      .catch(error => {
        this.setState(prevState => {
          return {
            ...prevState,
            error: {
              ...prevState.error,
              username: `something went wrong`,
            },
          };
        });
      });
  };
  render() {
    const { username, email, password, error } = this.state;
    return (
      <section>
        <div className="signupFormCnt container">
          <div className="txtCnt">
            <h1 className="">signup</h1>
            <NavLink>Have an account</NavLink>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="">
              <span className={error.username ? `error` : ``}>
                {error.username}
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="">
              <span className={error.email ? `error` : ``}>{error.email}</span>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="">
              <span className={error.password ? `error` : ``}>
                {error.password}
              </span>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary ">
                signup
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
export default Signup;
