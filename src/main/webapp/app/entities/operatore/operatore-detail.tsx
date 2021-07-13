import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './operatore.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OperatoreDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const operatoreEntity = useAppSelector(state => state.operatore.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="operatoreDetailsHeading">
          <Translate contentKey="frontEndApp.operatore.detail.title">Operatore</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{operatoreEntity.id}</dd>
          <dt>
            <span id="idAslOperatore">
              <Translate contentKey="frontEndApp.operatore.idAslOperatore">Id Asl Operatore</Translate>
            </span>
          </dt>
          <dd>{operatoreEntity.idAslOperatore}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="frontEndApp.operatore.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{operatoreEntity.nome}</dd>
          <dt>
            <span id="cognome">
              <Translate contentKey="frontEndApp.operatore.cognome">Cognome</Translate>
            </span>
          </dt>
          <dd>{operatoreEntity.cognome}</dd>
          <dt>
            <span id="dataNascita">
              <Translate contentKey="frontEndApp.operatore.dataNascita">Data Nascita</Translate>
            </span>
          </dt>
          <dd>
            {operatoreEntity.dataNascita ? <TextFormat value={operatoreEntity.dataNascita} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="luogoNascita">
              <Translate contentKey="frontEndApp.operatore.luogoNascita">Luogo Nascita</Translate>
            </span>
          </dt>
          <dd>{operatoreEntity.luogoNascita}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="frontEndApp.operatore.email">Email</Translate>
            </span>
          </dt>
          <dd>{operatoreEntity.email}</dd>
          <dt>
            <span id="telefono">
              <Translate contentKey="frontEndApp.operatore.telefono">Telefono</Translate>
            </span>
          </dt>
          <dd>{operatoreEntity.telefono}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="frontEndApp.operatore.password">Password</Translate>
            </span>
          </dt>
          <dd>{operatoreEntity.password}</dd>
          <dt>
            <Translate contentKey="frontEndApp.operatore.prenotazione">Prenotazione</Translate>
          </dt>
          <dd>
            {operatoreEntity.prenotaziones
              ? operatoreEntity.prenotaziones.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {operatoreEntity.prenotaziones && i === operatoreEntity.prenotaziones.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/operatore" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/operatore/${operatoreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OperatoreDetail;
