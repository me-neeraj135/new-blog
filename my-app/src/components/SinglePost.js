/** @format */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import withRouter from "./withRouter";
import { articleURL } from "../Apis/constant";
import Loader from "./Loader";

class SinglePost extends Component {
  state = {
    article: null,
    error: ``,
  };

  componentDidMount() {
    let slug = this.props.params.slug;
    // console.log(slug, `sluggg`);
    fetch(articleURL + `/` + slug)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          article: data.article.article,
          error: "",
        });
      })
      .catch(err => {
        this.setState({ error: `something went wrong!` });
      });
  }

  render() {
    let { article, error } = this.state;

    if (error) {
      return <p>{error}</p>;
    }

    if (!article) {
      return <Loader />;
    }

    return (
      <article className="singlePostCnt">
        <header>
          <div className="container">
            <h1 className="primary-heading">{article.title}</h1>
            <div className="imgBx flex align-center">
              <figure>
                <img src={article.author.image} alt={article.username} />
              </figure>

              <div className="usernameBx">
                <p>{article.author.username}</p>
                <span>{article.createdAt}</span>
              </div>
            </div>
          </div>
        </header>
        <main className="container">
          <div>
            <p>{article.description}</p>
            <ul>
              <li></li>
            </ul>
          </div>
        </main>
        <footer>
          <nav className="container">
            <small>
              <NavLink>sign</NavLink> in or <NavLink>signup</NavLink> to add
              comment on this article
            </small>
          </nav>
        </footer>
      </article>
    );
  }
}

export default withRouter(SinglePost);
