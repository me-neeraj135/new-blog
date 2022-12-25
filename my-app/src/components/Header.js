/** @format */
import { NavLink } from "react-router-dom";
function Header(props) {
  return (
    <header className="pdtB">
      <nav className="container flex justify-between">
        <NavLink to="/">
          <div>conduit</div>
        </NavLink>
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
          <NavLink activeclassname="active">
            <li>write</li>
          </NavLink>
          <NavLink activeclassname="active">
            <li>setting</li>
          </NavLink>
          <NavLink activeclassname="active">
            <li>profile</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
