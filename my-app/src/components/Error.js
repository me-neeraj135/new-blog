/** @format */
import { NavLink } from "react-router-dom";

function Error() {
  return (
    <div className="errorCnt container flex justify-center align-center txtCnt">
      <div>
        <h1 className="primary-heading">404 page not found</h1>

        <NavLink to="/">
          <button className="">go to back</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Error;
