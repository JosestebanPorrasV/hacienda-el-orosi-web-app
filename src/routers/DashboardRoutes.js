import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AdministratorScreen } from '../components/administrator/AdministratorScreen';
import { LendScreen } from '../components/lend/LendScreen';
import { ToolScreen } from '../components/tool/ToolScreen';
import { ActiveScreen } from '../components/tool/ActiveScreen';
import { JobScreen } from '../components/job/JobScreen';
import { PaymentScreen } from '../components/payment/PaymentScreen';
import { AnimalsScreen } from '../components/animal/AnimalsScreen';
import { DietScreen } from '../components/diet/DietScreen';
import { HealthScreen } from '../components/health/HealthScreen';
import { MedicamentScreen } from '../components/medicament/MedicamentScreen';
import { ProductScreen } from '../components/product/ProductScreen';
import { CollaboratorScreen } from '../components/collaborator/CollaboratorScreen';
import { RecoveryPass } from '../components/auth/RecoveryPass';
import { TypesAnimalsScreen } from '../components/animal/TypesAnimalsScreen';
import { AnimalsScreenV2 } from '../components/animal/AnimalsScreenV2';

export const DashboardRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/administradores" component={AdministratorScreen} />
        <Route exact path="/editar-cuenta" component={RecoveryPass} />
        <Route exact path="/colaboradores" component={CollaboratorScreen} />
        <Route exact path="/pagos" component={PaymentScreen} />
        <Route exact path="/prestamos" component={LendScreen} />
        {/*<Route exact path="/contratos" component={ContractScreen} /> */}
        <Route exact path="/herramientas" component={ToolScreen} />
        <Route exact path="/herramientas-activas" component={ActiveScreen} />
        <Route exact path="/trabajos" component={JobScreen} />
        <Route exact path="/ganado-funcional" component={AnimalsScreen} />
        <Route exact path="/ganado-detallado" component={AnimalsScreenV2} />
        <Route exact path="/tipos-de-ganado" component={TypesAnimalsScreen} />
        <Route exact path="/dietas" component={DietScreen} />
        <Route exact path="/productos" component={ProductScreen} />
        <Route exact path="/salud" component={HealthScreen} />
        <Route exact path="/medicamentos" component={MedicamentScreen} />
        <Redirect to="/colaboradores" />
      </Switch>
    </Router>
  );
};
