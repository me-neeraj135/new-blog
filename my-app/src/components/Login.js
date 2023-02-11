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

    errors: {
      email: ``,
      password: ``,
    },
  };
  handleChange = e => {
    let { name, value } = e.target;
    let errors = { ...this.state.errors };

    isValid(name, value, errors);
    this.setState({ errors, [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const reqBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    };

    try {
      const res = await fetch(loginURL, reqBody);
      if (!res.ok) {
        const { errors } = await res.json();
        // console.log(errors, `errorData`);

        this.setState(prevState => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: `Email or password is incorrect`,
            },
          };
        });
        throw new Error(`fetch error`);
      }
      // console.log(res, `res-ok`);
      let user = await res.json();
      // console.log(user, `user-loggedin`);
      this.props.updatedUser(user);
      this.setState({ email: "", password: "" });
      this.props.navigate(`/`);
    } catch (error) {
      console.log({ error });
    }
  };

  render() {
    // console.log(this.props, `login - props`);

    const { email, password, errors } = this.state;
    return (
      <section>
        <div className="signupFormCnt container">
          <div className="txtCnt">
            <h1 className="">login</h1>
            <NavLink>need an account</NavLink>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="">
              <span className={errors.email ? `error` : ``}>
                {errors.email}
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
                {errors.password}
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
