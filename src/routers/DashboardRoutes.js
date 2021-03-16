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
          path="/listar-colaboradores"
          component={CollaboratorScreen}
        />
        <Route exact path="/listar-prestamos" component={LendScreen} />
        <Route exact path="/listar-contratos" component={ContractScreen} />
        <Route exact path="/listar-herramientas" component={ToolScreen} />
        <Route exact path="/listar-activos" component={ActiveScreen} />
        <Redirect to="/listar-colaboradores" />
      </Switch>
    </Router>
  );
};