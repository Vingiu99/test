import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './paziente.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PazienteDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const pazienteEntity = useAppSelector(state => state.paziente.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pazienteDetailsHeading">
          <Translate contentKey="frontEndApp.paziente.detail.title">Paziente</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.id}</dd>
          <dt>
            <span id="codiceFiscale">
              <Translate contentKey="frontEndApp.paziente.codiceFiscale">Codice Fiscale</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.codiceFiscale}</dd>
          <dt>
            <span id="tesseraSanitaria">
              <Translate contentKey="frontEndApp.paziente.tesseraSanitaria">Tessera Sanitaria</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.tesseraSanitaria}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="frontEndApp.paziente.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.nome}</dd>
          <dt>
            <span id="cognome">
              <Translate contentKey="frontEndApp.paziente.cognome">Cognome</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.cognome}</dd>
          <dt>
            <span id="dataNascita">
              <Translate contentKey="frontEndApp.paziente.dataNascita">Data Nascita</Translate>
            </span>
          </dt>
          <dd>
            {pazienteEntity.dataNascita ? <TextFormat value={pazienteEntity.dataNascita} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="luogoNascita">
              <Translate contentKey="frontEndApp.paziente.luogoNascita">Luogo Nascita</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.luogoNascita}</dd>
          <dt>
            <span id="luogoResidenza">
              <Translate contentKey="frontEndApp.paziente.luogoResidenza">Luogo Residenza</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.luogoResidenza}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="frontEndApp.paziente.email">Email</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.email}</dd>
          <dt>
            <span id="telefono">
              <Translate contentKey="frontEndApp.paziente.telefono">Telefono</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.telefono}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="frontEndApp.paziente.password">Password</Translate>
            </span>
          </dt>
          <dd>{pazienteEntity.password}</dd>
          <dt>
            <Translate contentKey="frontEndApp.paziente.prenotazione">Prenotazione</Translate>
          </dt>
          <dd>{pazienteEntity.prenotazione ? pazienteEntity.prenotazione.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/paziente" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paziente/${pazienteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PazienteDetail;
