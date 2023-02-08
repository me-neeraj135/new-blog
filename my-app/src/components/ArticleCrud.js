/** @format */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { articleURL } from "../Apis/constant";

// DELETE /api/articles/:slug
// const handleDelete = (token, slug) => {
//   console.log(token, slug, `crud-token`);
//   let reqBody = {
//     method: `DELETE`,
//     headers: {
//       "Content-type": "application/json",
//       authorization: token,
//     },
//   };

//   fetch(articleURL + `/:${slug}`, reqBody)
//     .then(res => {
//       if (!res.ok) {
//         throw new Error(`can't delete`);
//       }
//       <NavLink to="/"></NavLink>;
//     })
//     .catch(error => {
//       return error;
//     });
// };
// const handleEdit = () => {};

// export { handleDelete, handleEdit };
