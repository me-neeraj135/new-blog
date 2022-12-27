/** @format */

import React, { Component } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import isValid from "../validation/validate";
import { loginURL } from "../Apis/constant";

class LoginComp extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,

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
    const { email, password } = this.state;
    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then(res => {
        if (!res.ok) {
          res.json().then(({ error }) => {
            return Promise.reject(error);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        // console.log(user, `loginnnn`);
        this.props.updatedUser(user);
        this.setState({ email: "", password: "", error: "" });
        this.props.navigate(`/`);
      })
      .catch(error => {
        this.setState(prevState => {
          return {
            ...prevState,
            error: {
              ...prevState.error,
              email: `email or password is incorrect`,
            },
          };
        });
      });
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

const Login = props => {
  const navigate = useNavigate();
  return <LoginComp navigate={navigate} {...props} />;
};

export default Login;
