import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const { currentUser } = useAuth();
  // const isLoggedIn = currentUser.isLoggedIn;

  //   console.log(currentUser, "private");

  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
