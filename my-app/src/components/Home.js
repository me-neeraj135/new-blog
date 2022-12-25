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

class Home extends Component {
  state = {
    articles: null,
    error: "",
    articlesCount: 0,
    articlesPerPage: 10,
    activePageIndex: 1,
    activeTab: "",
  };

  fetchData = () => {
    const limit = this.state.articlesPerPage;
    const offset = (this.state.activePageIndex - 1) * limit;
    const tag = this.state.activeTab;

    fetch(
      articleURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
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
          articlesCount: data.articles.length,
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
              <Posts articles={articles} error={error} />
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
