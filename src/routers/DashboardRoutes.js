import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CollaboratorScreen } from "../components/collaborator/CollaboratorScreen";
import { AdministratorScreen } from "../components/administrator/AdministratorScreen";
import { LendScreen } from "../components/lend/LendScreen";
import { LendHistoryScreen } from "../components/lend/LendHistoryScreen";
import { ContractScreen } from "../components/contract/ContractScreen";

export const DashboardRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/listar-administradores"
          component={AdministratorScreen}
        />
        <Route
          exact
          path="/listar-colaboradores"
          component={CollaboratorScreen}
        />
        <Route exact path="/listar-prestamos" component={LendScreen} />
        <Route exact path="/prestamo-historial" component={LendHistoryScreen} />
        <Route exact path="/listar-contratos" component={ContractScreen} />
        <Redirect to="/menu-principal" />
      </Switch>
    </Router>
  );
};