import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Paziente from './paziente';
import PazienteDetail from './paziente-detail';
import PazienteUpdate from './paziente-update';
import PazienteDeleteDialog from './paziente-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PazienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PazienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PazienteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Paziente} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PazienteDeleteDialog} />
  </>
);

export default Routes;
