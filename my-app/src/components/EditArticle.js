/** @format */

import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { articleURL, localStorageKey } from "../Apis/constant";
const token = localStorage[localStorageKey]
  ? JSON.parse(localStorage[localStorageKey])
  : "";

const api = axios.create({
  baseURL: articleURL,
  headers: {
    "Content-Type": "application/json",
    authorization: token,
  },
});

class EditArticleComp extends Component {
  state = {
    title: ``,
    description: ``,
    body: ``,
    taglist: ``,

    error: ``,
  };
  // PUT /api/articles/:slug

  handleSubmit = e => {
    e.preventDefault();
    let { title, description, body, taglist } = this.state;
    let { slug } = this.props.article;
    let { navigate } = this.props;
    const editURL = articleURL + `/${slug}`;

    fetch(editURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          taglist: taglist,
        },
      }),
    });
    navigate("/");
  };

  // navigate(`/article/${res.data.article.slug}`)

  handleChange = e => {
    let { name, value } = e.target;

    this.setState({ [name]: value });
  };
  componentDidMount() {
    let { title, description, body, taglist } = this.props.article;

    console.log(this.props.article, taglist, `edit-pro-art`);
    this.setState({ title, description, body, taglist });
  }

  render() {
    let { title, description, body, taglist } = this.state;
    // console.log(this.props.article, `edit-art`);
    return (
      <form className="new_postForm" onSubmit={this.handleSubmit}>
        <legend>
          <label htmlFor="">
            <span></span>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <span>{}</span>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="description"
            onChange={this.handleChange}
          />
          <span></span>
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            value={body}
            placeholder="body"
            onChange={this.handleChange}
          ></textarea>
          <input
            type="text"
            name="taglist"
            value={taglist}
            placeholder="tag"
            onChange={this.handleChange}
          />
          <input type="submit" value="update Article" />
        </legend>
      </form>
    );
  }
}

const EditArticle = props => {
  let location = useLocation();
  let navigate = useNavigate();
  let { state } = location;
  return <EditArticleComp {...props} navigate={navigate} article={state} />;
};

export default EditArticle;
