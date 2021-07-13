import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Prenotazione from './prenotazione';
import PrenotazioneDetail from './prenotazione-detail';
import PrenotazioneUpdate from './prenotazione-update';
import PrenotazioneDeleteDialog from './prenotazione-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrenotazioneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrenotazioneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrenotazioneDetail} />
      <ErrorBoundaryRoute path={match.url} component={Prenotazione} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrenotazioneDeleteDialog} />
  </>
);

export default Routes;
