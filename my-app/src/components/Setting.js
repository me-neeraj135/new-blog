/** @format */

import React, { Component } from "react";

class Setting extends Component {
  render() {
    return (
      <form className="settingForm">
        <legend>
          <label htmlFor="">your Setting</label>
          <input type="text" placeholder="profile pic url" />
          <input type="text" placeholder="name" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="bio"
          ></textarea>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="submit" value="Update" />
        </legend>
      </form>
    );
  }
}

export default Setting;
