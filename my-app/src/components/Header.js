/** @format */
import { NavLink, useNavigate } from "react-router-dom";

function Header(props) {
  return (
    <header className="pdtB mainHeader">
      <nav className="container flex justify-between">
        <NavLink to="/">
          <div className="logo">conduit</div>
        </NavLink>

        <ul>
          {props.isLoggedIn ? <AuthHeader {...props} /> : <NonAuthHeader />}
        </ul>
      </nav>
    </header>
  );
}

function NonAuthHeader(props) {
  return (
    <ul className="navUl flex justify-between">
      <NavLink activeclassname="active" to="/">
        <li>home</li>
      </NavLink>
      <NavLink activeclassname="active" to="/login">
        <li>sign-in</li>
      </NavLink>
      <NavLink activeclassname="active" to="/signup">
        <li>sign-up</li>
      </NavLink>
    </ul>
  );
}

function AuthHeader(props) {
  return (
    <ul className="navUl flex justify-between">
      <NavLink activeclassname="active" to="/">
        <li>Home</li>
      </NavLink>

      <NavLink activeclassname="active" to="/new-post">
        <li>new Article</li>
      </NavLink>

      <NavLink activeclassname="active" to="/setting">
        <li>setting</li>
      </NavLink>
      <NavLink activeclassname="active" to="/profile">
        <li>profile</li>
      </NavLink>

      <li className="logOut" onClick={props.logOut}>
        log out
      </li>
    </ul>
  );
}
export default Header;
