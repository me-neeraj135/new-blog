/** @format */

import { NavLink } from "react-router-dom";

function FeedNav(props) {
  return (
    <div>
      <nav className="">
        <ul className="feedNav flex align-center">
          <li onClick={props.removeTab}>
            <NavLink activeclassname="active" to="/">
              <span>global feed</span>
            </NavLink>
          </li>

          {props.activeTab && (
            <li className="">
              <NavLink activeclassname="active" to="/">
                <span>#{props.activeTab}</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default FeedNav;
