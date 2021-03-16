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
import { ContractScreen } from "../components/contract/ContractScreen";
import { ToolScreen } from "../components/tool/ToolScreen";
import { ActiveScreen } from "../components/tool/ActiveScreen";
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
          path="/colaboradores"
          component={CollaboratorScreen}
        />
        <Route exact path="/prestamos" component={LendScreen} />
        <Route exact path="/contratos" component={ContractScreen} />
        <Route exact path="/herramientas" component={ToolScreen} />
        <Route exact path="/herramientas-activas" component={ActiveScreen} />
        <Redirect to="/colaboradores" />
      </Switch>
    </Router>
  );
};