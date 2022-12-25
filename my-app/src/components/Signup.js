/** @format */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import isValid from "../validation/validate";

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

  handleSubmit = () => {};
  render() {
    const { username, email, password, error } = this.state;
    return (
      <section>
        <div className="signupFormCnt container">
          <div className="txtCnt">
            <h1 className="">signup</h1>
            <NavLink>Have an account</NavLink>
          </div>
          <form action="">
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
