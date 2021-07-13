import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './prenotazione.reducer';
import { IPrenotazione } from 'app/shared/model/prenotazione.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Prenotazione = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const prenotazioneList = useAppSelector(state => state.prenotazione.entities);
  const loading = useAppSelector(state => state.prenotazione.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="prenotazione-heading" data-cy="PrenotazioneHeading">
        <Translate contentKey="frontEndApp.prenotazione.home.title">Prenotaziones</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="frontEndApp.prenotazione.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="frontEndApp.prenotazione.home.createLabel">Create new Prenotazione</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {prenotazioneList && prenotazioneList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.codiceFiscale">Codice Fiscale</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.tesseraSanitaria">Tessera Sanitaria</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.cognome">Cognome</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.dataNascita">Data Nascita</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.luogoNascita">Luogo Nascita</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.luogoResidenza">Luogo Residenza</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.telefono">Telefono</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.luogoVaccino">Luogo Vaccino</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.prenotazione.dataVaccino">Data Vaccino</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prenotazioneList.map((prenotazione, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${prenotazione.id}`} color="link" size="sm">
                      {prenotazione.id}
                    </Button>
                  </td>
                  <td>{prenotazione.codiceFiscale}</td>
                  <td>{prenotazione.tesseraSanitaria}</td>
                  <td>{prenotazione.nome}</td>
                  <td>{prenotazione.cognome}</td>
                  <td>
                    {prenotazione.dataNascita ? <TextFormat type="date" value={prenotazione.dataNascita} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{prenotazione.luogoNascita}</td>
                  <td>{prenotazione.luogoResidenza}</td>
                  <td>{prenotazione.email}</td>
                  <td>{prenotazione.telefono}</td>
                  <td>{prenotazione.luogoVaccino}</td>
                  <td>
                    {prenotazione.dataVaccino ? <TextFormat type="date" value={prenotazione.dataVaccino} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prenotazione.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prenotazione.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${prenotazione.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="frontEndApp.prenotazione.home.notFound">No Prenotaziones found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Prenotazione;
