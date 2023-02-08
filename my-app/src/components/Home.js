/** @format */

import React, { Component } from "react";

import Article from "./Article";
import Banner from "./Banner";
import FeedNav from "./FeedNav";
import Tags from "./Tags";
import Footer from "./Footer";
import Pagination from "./Pagination";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import { articleURL, tagURL } from "../Apis/constant";
import { localStorageKey } from "../Apis/constant";
import axios from "axios";

const token = localStorage[localStorageKey]
  ? JSON.parse(localStorage[localStorageKey])
  : ``;

class Home extends Component {
  state = {
    articles: null,
    error: "",
    articlesCount: 0,
    articlesPerPage: 10,
    activePageIndex: 1,
    activeTab: "",
  };

  handleFavorite = (a, s, t) => {
    if (t) {
      try {
        axios({
          method: a.favorited ? "DELETE" : "POST",
          url: articleURL + `/${s}/favorite`,
          headers: {
            "Content-type": "application/json",
            authorization: t,
          },
        });
        this.fetchData();
      } catch (error) {
        this.setState({ error });
      }
    } else {
      this.setState({ error: `please login` });
    }
  };

  fetchData = () => {
    const limit = this.state.articlesPerPage;
    const offset = (this.state.activePageIndex - 1) * limit;
    const tag = this.state.activeTab;

    fetch(
      articleURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      }
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          articles: data.articles,
          error: "",
          articlesCount: data.articlesCount,
        });
      })
      .catch(err => {
        this.setState({ error: `something went wrong!` });
      });
  };

  handlePagination = index => {
    // console.log(index, `ii`);
    this.setState({ activePageIndex: index }, this.fetchData);
  };

  removeTab = () => {
    this.setState({ activeTab: `` });
  };

  addTab = tab => {
    this.setState({ activeTab: tab });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activePageIndex !== this.state.activePageIndex ||
      prevState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      articles,
      articlesCount,
      articlesPerPage,
      activePageIndex,
      activeTab,
      error,
    } = this.state;
    return (
      <>
        <main>
          <Banner />
          <div className=" container pdtB flex justify-between">
            <section className="mrgTb flex-70 ">
              <FeedNav activeTab={activeTab} removeTab={this.removeTab} />
              <Posts
                articles={articles}
                error={error}
                favoriteFunc={this.handleFavorite}
              />

              <Pagination
                articlesCount={articlesCount}
                articlesPerPage={articlesPerPage}
                activePageIndex={activePageIndex}
                handlePagination={this.handlePagination}
              />
            </section>
            <div className="flex-25">
              <Sidebar addTab={this.addTab} />
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }
}

export default Home;
