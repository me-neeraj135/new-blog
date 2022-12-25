/** @format */

import React, { Component } from "react";

function Pagination(props) {
  let { articlesCount, articlesPerPage, activePageIndex, handlePagination } =
    props;
  let numberOfPages = Math.ceil(articlesCount / articlesPerPage);
  let pagesArray = [];

  // console.log(
  //   pagesArray,
  //   articlesCount,
  //   articlesPerPage,
  //   numberOfPages,
  //   activePageIndex,
  //   `act`
  // );

  for (let i = 1; i < numberOfPages; i++) {
    pagesArray.push(i);
  }
  return (
    <div className="pgiCnt txtCnt">
      <div
        className="preBtn btn btn-primary"
        onClick={() =>
          handlePagination(activePageIndex - 1 < 1 ? 1 : activePageIndex - 1)
        }
      >
        <p>pre</p>
      </div>

      <div className="pgiBox">
        {pagesArray.map(page => {
          return (
            <span
              key={page}
              className={`${
                activePageIndex === page ? `activePagination` : ``
              }`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </span>
          );
        })}
      </div>

      <div
        className="nextBtn btn btn-primary"
        onClick={() =>
          handlePagination(
            activePageIndex + 1 > numberOfPages
              ? numberOfPages
              : activePageIndex + 1
          )
        }
      >
        <p>next</p>
      </div>
    </div>
  );
}
export default Pagination;
