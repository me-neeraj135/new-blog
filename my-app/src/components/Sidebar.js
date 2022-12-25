/** @format */

import React, { Component } from "react";

import { tagURL } from "../Apis/constant";
import Loader from "./Loader";

class Sidebar extends Component {
  state = {
    tags: null,
    error: "",
  };

  componentDidMount() {
    fetch(tagURL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) => {
        this.setState({ tags, error: "" });
      })
      .catch(err => {
        this.setState({ error: `something went wrong !` });
      });
  }
  render() {
    const { tags, error } = this.state;
    if (error) {
      return <p className="tertiary-heading">{error}</p>;
    }
    if (!tags) {
      return <h3>Loading...</h3>;
    }

    return (
      <aside className="tgsAside">
        <h3 className="tertiary-heading">popular tags</h3>
        <div className="flex flex-wrap-yes">
          {tags.map(tag => (
            <span key={tag} onClick={() => this.props.addTab(tag)}>
              {tag}
            </span>
          ))}
        </div>
      </aside>
    );
  }
}
export default Sidebar;
