import React from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "../components/ui/Dashboard";

export const DashboardRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/menu-principal" component={Dashboard} />
        <Redirect to="/menu-principal" />
      </Switch>
    </BrowserRouter>
  );
};
