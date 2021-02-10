import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoginScreen } from "../components/auth/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { startChecking } from "../actions/AuthAction";
import { RecoveryPass } from "../components/auth/RecoveryPass";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h1>Espere...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/ingresar"
            component={LoginScreen}
            isAuthenticated={!!id}
          />

          <PublicRoute
            exact
            path="/recuperar-cuenta"
            component={RecoveryPass}
            isAuthenticated={!!id}
          />

          <PrivateRoute
            path="/"
            component={DashboardRoutes}
            isAuthenticated={!!id}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
