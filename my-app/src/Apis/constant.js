/** @format */

// const ROOT_URL = "https://api.realworld.io/api/";
// const ROOT_URL = "https://conduit.productionready.io/api/";
const ROOT_URL = "https://conduitapi.onrender.com/api/";

const articleURL = ROOT_URL + `articles`;
const tagURL = ROOT_URL + `tags`;
const signupURL = ROOT_URL + `users`;
const loginURL = ROOT_URL + "users/login";
const verifyUserURL = ROOT_URL + `user`;
const localStorageKey = `userToken`;
const authorProfile = `authorProfile`;

export {
  ROOT_URL,
  articleURL,
  tagURL,
  signupURL,
  loginURL,
  localStorageKey,
  verifyUserURL,
  authorProfile,
};
