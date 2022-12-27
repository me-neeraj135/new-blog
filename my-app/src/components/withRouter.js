/** @format */

import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const withRouter = WrappedComponent => props => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();

  return <WrappedComponent {...props} params={(location, navigate, params)} />;
};

export default withRouter;
