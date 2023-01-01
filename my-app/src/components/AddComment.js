/** @format */

import React, { Component } from "react";
import { articleURL, localStorageKey } from "../Apis/constant";

const token =
  localStorage[localStorageKey] && JSON.parse(localStorage[localStorageKey]);
let commentURL;
class AddComment extends Component {
  state = {
    comment: ``,
    comments: [],
    error: ``,
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value, error: `` });
  };

  // GET /api/articles/:slug/comments

  findComment = async () => {
    const { slug } = this.props.article;
    commentURL = articleURL + `/${slug}/comments`;

    try {
      let res = await fetch(commentURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      let data = await res.json();
      this.setState({ comments: data.comments });
    } catch (error) {
      this.setState({ error });
    }
  };

  // POST /api/articles/:slug/comments

  submitComment = e => {
    e.preventDefault();
    const { slug } = this.props.article;
    const { comment } = this.state;

    commentURL = articleURL + `/${slug}/comments`;

    if (token) {
      if (!this.state.comment) {
        this.setState({ error: `please write comment` });
      } else {
        const reqBody = {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({
            comment: {
              body: comment,
            },
          }),
        };

        fetch(commentURL, reqBody)
          .then(res => {
            if (!res.ok) {
              throw new Error(`something went wrong`);
            }
            return res.json();
          })
          .then(res => {
            this.setState({ comment: `` }, this.findComment);
          })
          .catch(error => {
            this.setState({ error });
          });
      }
    }
  };

  // DELETE /api/articles/:slug/comments/:id

  handleDelete = async id => {
    const { slug } = this.props.article;
    let { comments } = this.state;

    commentURL = articleURL + `/${slug}/comments/${id}`;

    let reqBody = {
      method: `DELETE`,
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    try {
      await fetch(commentURL, reqBody);
      let index = await comments.findIndex(c => {
        return c.id === id;
      });

      comments.splice(index, 1);
      await this.setState({ comments: comments });
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.findComment();
  }

  render() {
    let { comments, error } = this.state;
    return (
      <div className="addCmt">
        <p>{error ? error : ``}</p>
        <form onSubmit={this.submitComment}>
          <textarea
            name="comment"
            id=""
            value={this.state.comment}
            placeholder="comment..."
            onChange={this.handleChange}
          ></textarea>
          <div>
            <button type="submit" className="btn btn-secondary">
              add comment
            </button>
          </div>
        </form>

        <ul className="mrgTb">
          {comments.map(c => {
            return (
              <li key={c.id} className="cmtLi">
                <p className="flex align-center">
                  {" "}
                  <span className="author">{c.author.username}</span> :{" "}
                  <span className="comment">{c.body}</span>{" "}
                  <button
                    className="cmtDelete"
                    onClick={() => this.handleDelete(c.id)}
                  >
                    delete
                  </button>
                </p>
                <span className="cmt-created">
                  createdAt: {c.createdAt.slice(0, 10)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default AddComment;
