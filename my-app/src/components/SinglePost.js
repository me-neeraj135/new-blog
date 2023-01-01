/** @format */

import React, { Component } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import withRouter from "./withRouter";
import Loader from "./Loader";
import AddComment from "./AddComment";
import EditArticle from "./EditArticle";
import axios from "axios";

import {
  articleURL,
  localStorageKey,
  ROOT_URL,
  authorProfile,
} from "../Apis/constant";

let token = localStorage[localStorageKey]
  ? JSON.parse(localStorage[localStorageKey])
  : "";

const api = axios.create({
  baseURL: articleURL,
  headers: {
    "Content-Type": "application/json",
    authorization: token,
  },
});

class SinglePostComp extends Component {
  state = {
    article: null,
    profile: null,
    error: ``,
  };

  // POST /api/articles/:slug/favorite

  handleFavorite = async () => {
    if (token) {
      let slug = this.state.article.slug;
      let { article } = this.state;

      axios({
        method: article.favorited ? "DELETE" : "POST",
        url: articleURL + `/${slug}/favorite`,
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      })
        .then(res => {
          this.setState({ article: res.data.article.article });
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    } else {
      this.setState({ error: `please login` });
    }
  };

  fetchData = async () => {
    let slug = this.props.params.slug;

    try {
      let res = await fetch(articleURL + `/${slug}`, {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      let data = await res.json();
      this.setState(
        {
          article: data.article.article,
        },
        this.handleProfile
      );
    } catch (error) {
      this.setState({ error });
    }
  };

  handleDelete = () => {
    let slug = this.state.article.slug;
    console.log(token, slug, `crud-token`);

    api
      .delete(`/${slug}`)
      .then(res => {
        this.props.navigate(`/`);
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  // POST /api/profiles/:username/follow
  handleFollow = following => {
    let { profile } = this.state;

    fetch(ROOT_URL + `profiles/${profile && profile.username}/follow`, {
      method: following ? "DELETE" : "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    })
      .then(result => {
        return result.json();
      })
      .then(profile => {
        localStorage.setItem(authorProfile, JSON.stringify(profile.profile));
        this.setState({ profile: profile.profile });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  // GET /api/profiles/:username

  handleProfile = async () => {
    let { article, profile } = this.state;

    try {
      let res = await fetch(ROOT_URL + `profiles/${article.author.username}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      });
      let profile = await res.json();

      this.setState({ profile: profile.profile });
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let { article, profile, error } = this.state;
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
            <div className=" flex justify-between align-center ">
              <div className=" imgBx flex align-center">
                <figure>
                  <img
                    src={
                      article.author.image ||
                      `/images/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png`
                    }
                    alt={article.author.username}
                  />
                </figure>

                <div className="usernameBx">
                  <NavLink to="/profile">
                    <p>{article.author.username}</p>
                  </NavLink>
                  <span>{article.createdAt}</span>
                </div>
              </div>

              <div
                className="follow-btn"
                onClick={() => this.handleFollow(profile && profile.following)}
              >
                {profile && profile.following ? `unfollow` : `+follow`}
              </div>
            </div>
          </div>
        </header>
        <main className="container ">
          <div className="singPost">
            <div className="flex justify-between ">
              <p>{article.description}</p>
              {this.props.user.user.username ===
              this.state.article.author.username ? (
                <div className="edit-del-box flex justify-between">
                  <Link to="/edit/article" state={article}>
                    {" "}
                    <span className="flex align-center">
                      <img src="/images/icons8-edit-64.png" alt="edit" />
                      edit
                    </span>
                  </Link>

                  <span
                    className="flex align-center"
                    onClick={this.handleDelete}
                  >
                    <img src="/images/icons8-delete-48.png" alt="delete" />
                    delete
                  </span>
                </div>
              ) : (
                ``
              )}
            </div>
            <div className="flex justify-between align-center mrgTb">
              <p className="flex-80">{article.body}</p>
              <div className="pstLk" onClick={this.handleFavorite}>
                <span>💗</span>
                <span>{article.favoritesCount}</span>
              </div>
            </div>
          </div>
          {token ? (
            <section className="commentSec">
              <AddComment article={article} />
            </section>
          ) : (
            ``
          )}
        </main>
        {this.props.user === null ? (
          <footer>
            <nav className="container">
              <small>
                <NavLink to="/login">sign</NavLink> in or{" "}
                <NavLink to="/signup">signup</NavLink> to add comment on this
                article
              </small>
            </nav>
          </footer>
        ) : (
          ``
        )}
      </article>
    );
  }
}

const SinglePost = props => {
  let navigate = useNavigate();
  return <SinglePostComp {...props} navigate={navigate} />;
};

export default withRouter(SinglePost);
