import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './operatore.reducer';
import { IOperatore } from 'app/shared/model/operatore.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Operatore = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const operatoreList = useAppSelector(state => state.operatore.entities);
  const loading = useAppSelector(state => state.operatore.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="operatore-heading" data-cy="OperatoreHeading">
        <Translate contentKey="frontEndApp.operatore.home.title">Operatores</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="frontEndApp.operatore.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="frontEndApp.operatore.home.createLabel">Create new Operatore</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {operatoreList && operatoreList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="frontEndApp.operatore.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.idAslOperatore">Id Asl Operatore</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.cognome">Cognome</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.dataNascita">Data Nascita</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.luogoNascita">Luogo Nascita</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.telefono">Telefono</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="frontEndApp.operatore.prenotazione">Prenotazione</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {operatoreList.map((operatore, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${operatore.id}`} color="link" size="sm">
                      {operatore.id}
                    </Button>
                  </td>
                  <td>{operatore.idAslOperatore}</td>
                  <td>{operatore.nome}</td>
                  <td>{operatore.cognome}</td>
                  <td>
                    {operatore.dataNascita ? <TextFormat type="date" value={operatore.dataNascita} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{operatore.luogoNascita}</td>
                  <td>{operatore.email}</td>
                  <td>{operatore.telefono}</td>
                  <td>{operatore.password}</td>
                  <td>
                    {operatore.prenotaziones
                      ? operatore.prenotaziones.map((val, j) => (
                          <span key={j}>
                            <Link to={`prenotazione/${val.id}`}>{val.id}</Link>
                            {j === operatore.prenotaziones.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${operatore.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${operatore.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${operatore.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="frontEndApp.operatore.home.notFound">No Operatores found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Operatore;
