/** @format */

import React, { Component } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import isValid from "../validation/validate";
import { signupURL } from "../Apis/constant";

class SignupComp extends Component {
  state = {
    username: ``,
    email: ``,
    password: ``,
    errors: {
      username: ``,
      email: ``,
      password: ``,
    },
  };

  handleChange = e => {
    let { name, value } = e.target;
    let { errors } = { ...this.state };
    isValid(name, value, errors);
    this.setState({ errors, [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;

    const reqBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, email, password } }),
    };

    try {
      const res = await fetch(signupURL, reqBody);
      if (!res.ok) {
        const errors = await res.json().then(({ errors }) => {
          console.log(errors, `res-not-ok`);

          return Promise.reject(errors);
        });
      }
      console.log(res, `res-ok`);
      let user = await res.json();
      console.log(user, `user-signup`);
      this.props.updatedUser(user);
      this.setState({ username: "", email: "", password: "" });
      this.props.navigate(`/`);
    } catch (errors) {
      console.log(errors, `in-catch-signup`);
      if (errors.username) {
        this.setState(prevState => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,

              username: `username: ${errors.username}`,
            },
          };
        });
      }
      if (errors.email) {
        this.setState(prevState => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,

              email: `email: ${errors.email}`,
            },
          };
        });
      }
    }
  };
  render() {
    const { username, email, password, errors } = this.state;
    return (
      <section>
        <div className="signupFormCnt container">
          <div className="txtCnt">
            <h1 className="">signup</h1>
            <NavLink>Have an account</NavLink>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="">
              <span className={errors.username ? `error` : ``}>
                {errors.username && errors.username}
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
              <span className={errors.email ? `error` : ``}>
                {errors.email && errors.email}
              </span>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="">
              <span className={errors.password ? `error` : ``}>
                {errors.password && errors.password}
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

const Signup = props => {
  const navigate = useNavigate();
  return <SignupComp navigate={navigate} {...props} />;
};
export default Signup;
