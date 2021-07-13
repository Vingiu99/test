import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './prenotazione.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PrenotazioneDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const prenotazioneEntity = useAppSelector(state => state.prenotazione.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prenotazioneDetailsHeading">
          <Translate contentKey="frontEndApp.prenotazione.detail.title">Prenotazione</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.id}</dd>
          <dt>
            <span id="codiceFiscale">
              <Translate contentKey="frontEndApp.prenotazione.codiceFiscale">Codice Fiscale</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.codiceFiscale}</dd>
          <dt>
            <span id="tesseraSanitaria">
              <Translate contentKey="frontEndApp.prenotazione.tesseraSanitaria">Tessera Sanitaria</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.tesseraSanitaria}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="frontEndApp.prenotazione.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.nome}</dd>
          <dt>
            <span id="cognome">
              <Translate contentKey="frontEndApp.prenotazione.cognome">Cognome</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.cognome}</dd>
          <dt>
            <span id="dataNascita">
              <Translate contentKey="frontEndApp.prenotazione.dataNascita">Data Nascita</Translate>
            </span>
          </dt>
          <dd>
            {prenotazioneEntity.dataNascita ? (
              <TextFormat value={prenotazioneEntity.dataNascita} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="luogoNascita">
              <Translate contentKey="frontEndApp.prenotazione.luogoNascita">Luogo Nascita</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.luogoNascita}</dd>
          <dt>
            <span id="luogoResidenza">
              <Translate contentKey="frontEndApp.prenotazione.luogoResidenza">Luogo Residenza</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.luogoResidenza}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="frontEndApp.prenotazione.email">Email</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.email}</dd>
          <dt>
            <span id="telefono">
              <Translate contentKey="frontEndApp.prenotazione.telefono">Telefono</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.telefono}</dd>
          <dt>
            <span id="luogoVaccino">
              <Translate contentKey="frontEndApp.prenotazione.luogoVaccino">Luogo Vaccino</Translate>
            </span>
          </dt>
          <dd>{prenotazioneEntity.luogoVaccino}</dd>
          <dt>
            <span id="dataVaccino">
              <Translate contentKey="frontEndApp.prenotazione.dataVaccino">Data Vaccino</Translate>
            </span>
          </dt>
          <dd>
            {prenotazioneEntity.dataVaccino ? (
              <TextFormat value={prenotazioneEntity.dataVaccino} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/prenotazione" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prenotazione/${prenotazioneEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PrenotazioneDetail;
