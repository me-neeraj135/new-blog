/** @format */

function isValidUsername(username) {
  const usernameRegex = /^[a-z0-9_.]+$/;
  return usernameRegex.test(username);
}

function isEmailValid(emailAddress) {
  var EMAIL_REGEXP = new RegExp(
    "^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$",
    "i"
  );
  return EMAIL_REGEXP.test(emailAddress);
}

function validatePassword(password) {
  var rex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return rex.test(password);
}

export default function isValid(name, value, error) {
  switch (name) {
    case "username":
      let usernameError = isValidUsername(value)
        ? ``
        : `Usernames can only use letters, numbers, underscores, and periods.`;
      error.username = usernameError;
      break;
    case "email":
      let emailError = isEmailValid(value) ? `` : `not valid email`;
      error.email = emailError;
      break;

    case "password":
      let passwordError = validatePassword(value)
        ? ``
        : `min 8 letter password, with at least a symbol, upper and lower case letters and a number`;
      error.password = passwordError;
      break;

    default:
      return error;
  }
}
