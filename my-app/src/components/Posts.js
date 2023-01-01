/** @format */

import React, { Component } from "react";
import { articleURL } from "../Apis/constant";
import Post from "./Post";
import Loader from "./Loader";

function Posts(props) {
  let { articles, error, favoriteFunc } = props;
  if (error) {
    return <p className="tertiary-heading container">{error}</p>;
  }
  if (!articles) {
    return <Loader />;
  }
  return articles.map(article => (
    <Post key={article.slug} {...article} favoriteFunc={favoriteFunc} />
  ));
}

export default Posts;
