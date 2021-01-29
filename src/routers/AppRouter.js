import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoginScreen3 } from "../components/auth/LoginScreen3";
import { LoginScreen } from "../components/auth/LoginScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  let x = false;
  
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/acceso"
            component={LoginScreen3}
            isAuthenticated={!!x}
          />

          <PrivateRoute
            path="/"
            component={LoginScreen}
            isAuthenticated={!!x}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
