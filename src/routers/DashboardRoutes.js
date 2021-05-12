import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AdministratorScreen } from '../components/administrator/AdministratorScreen';
import { LendScreen } from '../components/lend/LendScreen';
import { ContractScreen } from '../components/contract/ContractScreen';
import { ToolScreen } from '../components/tool/ToolScreen';
import { ActiveScreen } from '../components/tool/ActiveScreen';
import { JobScreen } from '../components/job/JobScreen';
import { PaymentScreen } from '../components/payment/PaymentScreen';
import { AnimalsScreen } from '../components/animal/AnimalsScreen';
import { DietScreen } from '../components/diet/DietScreen';
import { ProductScreen } from '../components/product/ProductScreen';
import { CollaboratorScreen } from '../components/collaborator/CollaboratorScreen';
import { RecoveryPass } from '../components/auth/RecoveryPass';
import { TypesAnimalsScreen } from '../components/animal/TypesAnimalsScreen';

export const DashboardRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/administradores" component={AdministratorScreen} />
        <Route exact path="/editar-cuenta" component={RecoveryPass} />
        <Route exact path="/colaboradores" component={CollaboratorScreen} />
        <Route exact path="/pagos" component={PaymentScreen} />
        <Route exact path="/prestamos" component={LendScreen} />
        <Route exact path="/contratos" component={ContractScreen} />
        <Route exact path="/herramientas" component={ToolScreen} />
        <Route exact path="/herramientas-activas" component={ActiveScreen} />
        <Route exact path="/trabajos" component={JobScreen} />
        <Route exact path="/animales" component={AnimalsScreen} />
        <Route exact path="/tipos-de-animales" component={TypesAnimalsScreen} />
        <Route exact path="/dietas" component={DietScreen} />
        <Route exact path="/producto" component={ProductScreen} />
        <Route exact path="/producto" component={ProductScreen} />
        <Redirect to="/colaboradores" />
      </Switch>
    </Router>
  );
};
