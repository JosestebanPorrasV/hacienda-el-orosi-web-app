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
import { JobScreen } from "../components/job/JobScreen";
import { PaymentScreen } from "../components/payment/PaymentScreen";
import { AnimalsScreen } from "../components/animal/AnimalsScreen";
import { DietScreen } from "../components/diet/DietScreen";
import { AlimentScreen } from "../components/diet/AlimentScreen";

export const DashboardRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/listar-administradores"
          component={AdministratorScreen}
        />
        <Route exact path="/colaboradores" component={CollaboratorScreen} />
        <Route exact path="/pagos" component={PaymentScreen} />
        <Route exact path="/prestamos" component={LendScreen} />
        <Route exact path="/contratos" component={ContractScreen} />
        <Route exact path="/herramientas" component={ToolScreen} />
        <Route exact path="/herramientas-activas" component={ActiveScreen} />
        <Route exact path="/trabajos" component={JobScreen} />
        <Route exact path="/animales" component={AnimalsScreen} />
        <Route exact path="/dieta" component={DietScreen} />
        <Route exact path="/alimento" component={AlimentScreen} />
        <Redirect to="/colaboradores" />
      </Switch>
    </Router>
  );
};
