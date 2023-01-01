/** @format */

import React, { Component } from "react";
import FeedNav from "./FeedNav";
import { articleURL } from "../Apis/constant";
import Posts from "./Posts";
import axios from "axios";
class Profile extends Component {
  state = {
    activeTab: "author",
    articles: [],
    error: ``,
  };

  fetchData = () => {
    fetch(
      articleURL + `?${this.state.activeTab}=${this.props.user.user.username}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({ articles: data.articles });
      })
      .catch(err => {
        this.setState({
          error: `not able to fetch article`,
        });
      });
  };

  // POST /api/profiles/:username/follow

  handleActive = tab => {
    this.setState({ activeTab: tab }, () => {
      this.fetchData();
    });
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { activeTab } = this.state;
    const { username, image } = this.props.user.user;

    return (
      <div>
        <section className="profile-hero-section">
          <div className="container ">
            <div className="flex align-center flex-direction-column">
              <figure className="profileImg">
                <img
                  className="full-width bdRadius"
                  src={
                    image ||
                    `/images/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png`
                  }
                  alt={username}
                />
              </figure>
              <span className="proUsername">{username}</span>
            </div>
          </div>
          <div className="followCnt container flex justify-end">
            <p>
              + follow :<span>{username}</span>
            </p>
          </div>
        </section>
        <div className="container">
          <nav className="">
            <ul className="profileNav flex align-center">
              <li
                className={activeTab === `author` && `profileFeedActive`}
                onClick={() => this.handleActive(`author`)}
              >
                #my feed
              </li>

              <li
                className={activeTab === `favorited` && `profileFeedActive`}
                onClick={() => this.handleActive(`favorited`)}
              >
                #my favorite
              </li>
            </ul>
          </nav>
          <Posts articles={this.state.articles} />
        </div>
      </div>
    );
  }
}

export default Profile;
