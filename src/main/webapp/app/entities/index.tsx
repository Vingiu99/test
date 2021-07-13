import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Paziente from './paziente';
import Operatore from './operatore';
import Prenotazione from './prenotazione';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}paziente`} component={Paziente} />
      <ErrorBoundaryRoute path={`${match.url}operatore`} component={Operatore} />
      <ErrorBoundaryRoute path={`${match.url}prenotazione`} component={Prenotazione} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
