/** @format */

import "../style/loader.css";

function Loader() {
  return (
    <div style={{ height: `100vh` }} className="lds-ellipsis flex">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
