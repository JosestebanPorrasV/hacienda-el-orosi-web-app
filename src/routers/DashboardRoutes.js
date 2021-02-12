import React from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LendScreen } from "../components/lend/LendScreen";
import { Dashboard } from "../components/ui/Dashboard";
import {CollaboratorScreen } from "../components/collaborator/CollaboratorScreen";

export const DashboardRoutes = () => {
  return (
    <BrowserRouter>
      <Dashboard />
      <main>
        <div>
          <Switch>
            <Route exact path="/menu-principal" component={LendScreen} />
            <Route exact path="/collaborator" component={CollaboratorScreen} />

            <Redirect to="/menu-principal" />
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  );
};
