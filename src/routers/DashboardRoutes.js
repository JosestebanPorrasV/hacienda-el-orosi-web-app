import React from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "../components/ui/Dashboard";
import {CollaboratorScreen } from "../components/collaborator/CollaboratorScreen";
import { AdministratorScreen } from "../components/administrator/AdministratorScreen";
import { LendScreen } from "../components/lend/LendScreen";
import { LendHistoryScreen } from "../components/lend/LendHistoryScreen";
import { PaymentScreen} from "../components/payment/PaymentScreen";
import { ContractScreen} from "../components/contract/ContractScreen";

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
            <Route exact path="/listar-pagos" component={  PaymentScreen } />
            <Route exact path="/ver-contratos" component={  ContractScreen } />

            <Redirect to="/menu-principal" />
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  );
};
