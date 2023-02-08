/** @format */

import { NavLink } from "react-router-dom";

function FeedNav(props) {
  return (
    <div>
      <nav className="">
        <ul className="feedNav flex align-center">
          <li onClick={props.removeTab}>
            <NavLink activeclassname="active" to="/">
              global feed
            </NavLink>
          </li>

          {props.activeTab && (
            <li className="">
              <NavLink activeclassname="active" to="/">
                #{props.activeTab}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default FeedNav;
