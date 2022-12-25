/** @format */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import isValid from "../validation/validate";

class Login extends Component {
  state = {
    email: "",
    password: "",

    error: {
      email: ``,
      password: ``,
    },
  };

  handleChange = e => {
    let { name, value } = e.target;
    let error = { ...this.state.error };

    isValid(name, value, error);
    this.setState({ error, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <section>
        <div className="signupFormCnt container">
          <div className="txtCnt">
            <h1 className="">login</h1>
            <NavLink>need an account</NavLink>
          </div>
          <form onSubmit={this.handleSubmit}>
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
                login
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
