import React from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LendScreen } from "../components/lend/LendScreen";
import { Dashboard } from "../components/ui/Dashboard";

export const DashboardRoutes = () => {
  return (
    <BrowserRouter>
      <Dashboard />
      <main>
        <div>
          <Switch>
            <Route exact path="/menu-principal" component={LendScreen} />
            <Redirect to="/menu-principal" />
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  );
};
