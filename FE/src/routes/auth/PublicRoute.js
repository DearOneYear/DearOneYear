import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import IsLogin from "./IsLogin";
import {Navigate} from 'react-router-dom';


const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        IsLogin() && restricted ? <Navigate to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;

