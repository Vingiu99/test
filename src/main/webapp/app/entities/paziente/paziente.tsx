import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './paziente.reducer';
import { IPaziente } from 'app/shared/model/paziente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Paziente = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const pazienteList = useAppSelector(state => state.paziente.entities);
  const loading = useAppSelector(state => state.paziente.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="paziente-heading" data-cy="PazienteHeading">
        <Translate contentKey="frontEndApp.paziente.home.title">Pazientes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="frontEndApp.paziente.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="frontEndApp.paziente.home.createLabel">Create new Paziente</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {pazienteList && pazienteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="frontEndApp.paziente.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.codiceFiscale">Codice Fiscale</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.tesseraSanitaria">Tessera Sanitaria</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.cognome">Cognome</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.dataNascita">Data Nascita</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.luogoNascita">Luogo Nascita</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.luogoResidenza">Luogo Residenza</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.telefono">Telefono</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.paziente.prenotazione">Prenotazione</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pazienteList.map((paziente, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${paziente.id}`} color="link" size="sm">
                      {paziente.id}
                    </Button>
                  </td>
                  <td>{paziente.codiceFiscale}</td>
                  <td>{paziente.tesseraSanitaria}</td>
                  <td>{paziente.nome}</td>
                  <td>{paziente.cognome}</td>
                  <td>{paziente.dataNascita ? <TextFormat type="date" value={paziente.dataNascita} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{paziente.luogoNascita}</td>
                  <td>{paziente.luogoResidenza}</td>
                  <td>{paziente.email}</td>
                  <td>{paziente.telefono}</td>
                  <td>{paziente.password}</td>
                  <td>
                    {paziente.prenotazione ? <Link to={`prenotazione/${paziente.prenotazione.id}`}>{paziente.prenotazione.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${paziente.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paziente.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${paziente.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="frontEndApp.paziente.home.notFound">No Pazientes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Paziente;
