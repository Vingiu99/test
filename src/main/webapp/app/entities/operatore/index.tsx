import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Operatore from './operatore';
import OperatoreDetail from './operatore-detail';
import OperatoreUpdate from './operatore-update';
import OperatoreDeleteDialog from './operatore-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OperatoreUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OperatoreUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OperatoreDetail} />
      <ErrorBoundaryRoute path={match.url} component={Operatore} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OperatoreDeleteDialog} />
  </>
);

export default Routes;
