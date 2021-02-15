import React from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "../components/ui/Dashboard";
import {CollaboratorScreen } from "../components/collaborator/CollaboratorScreen";
import { AdministratorScreen } from "../components/administrator/AdministratorScreen";
import { LendScreen } from "../components/lend/LendScreen";
import { LendHistoryScreen } from "../components/lend/LendHistoryScreen";

export const DashboardRoutes = () => {
  return (
    <BrowserRouter>
      <Dashboard />
      <main>
        <div>
          <Switch>
            <Route exact path="/listar-administradores" component={AdministratorScreen} />
            <Route exact path="/listar-colaboradores" component={CollaboratorScreen} />
            <Route exact path="/listar-prestamos" component={LendScreen} />
            <Route exact path="/prestamo-historial" component={ LendHistoryScreen } />

            <Redirect to="/menu-principal" />
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  );
};
