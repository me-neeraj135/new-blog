/** @format */

import React, { Component } from "react";
import { articleURL } from "../Apis/constant";
import { localStorageKey } from "../Apis/constant";
import { NavLink, useNavigate } from "react-router-dom";

class NewPostComp extends Component {
  state = {
    title: ``,
    description: ``,
    body: ``,
    taglist: ``,
    errors: {
      title: ``,
      description: ``,
      body: ``,
    },
  };

  handleChange = e => {
    let { name, value } = e.target;
    let errors = { ...this.state.errors };
    switch (name) {
      case `title`:
        errors.title =
          value.length > 2 ? `` : `title should contain minimus 3 letter`;
        break;
      case `description`:
        errors.description =
          value.length > 2 ? `` : `description should contain minimus 3 letter`;
        break;
      case `body`:
        errors.body =
          value.length > 2 ? `` : `body should contain minimus 3 letter`;
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(e, `new post-sub`);
    let { title, description, body, taglist } = this.state;
    // console.log(title, description, body, tagList);
    let token = localStorage[localStorageKey]
      ? JSON.parse(localStorage[localStorageKey])
      : "";
    console.log(token, `tokkk`);

    const reqBody = {
      method: `POST`,
      headers: {
        "Content-type": `application/json`,
        authorization: `${token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          taglist: taglist.split(`,`).map(tag => tag.trim()),
        },
      }),
    };

    fetch(articleURL, reqBody)
      .then(res => {
        console.log(res, `new-post`);
        if (!res.ok) {
          return res.json().then(errors => {
            console.log(errors, `res-not-ok`);
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article, `new article`);
        this.setState({
          title: ``,
          description: ``,
          body: ``,
          tagList: ``,
        });
        this.props.navigate(`/`);
      })
      .catch(errors => {
        console.log(errors, `catch-post-error`);
        this.setState({ errors });
      });
  };

  render() {
    let { title, description, body, taglist } = this.state;
    let errors = this.state.errors;
    console.log(errors, `newpost-error obj`);
    return (
      <form className="new_postForm" onSubmit={this.handleSubmit}>
        <legend>
          <label htmlFor="">
            <span className={errors.title ? `error` : ``}>
              {errors.title ? errors.title : ``}
            </span>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <span className={errors.description ? `error` : ``}>
            {errors.description ? errors.description : ``}
          </span>
          <input
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={this.handleChange}
          />
          <span className={errors.body ? `error` : ``}>
            {errors.body ? errors.body : ``}
          </span>
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            placeholder="body"
            value={body}
            onChange={this.handleChange}
          ></textarea>
          <input
            type="text"
            name="taglist"
            value={taglist}
            placeholder="tag"
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit Article" />
        </legend>
      </form>
    );
  }
}

const NewPost = props => {
  const navigate = useNavigate();
  return <NewPostComp navigate={navigate} {...props} />;
};

export default NewPost;
