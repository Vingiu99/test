import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPrenotazione } from 'app/shared/model/prenotazione.model';
import { getEntities as getPrenotaziones } from 'app/entities/prenotazione/prenotazione.reducer';
import { getEntity, updateEntity, createEntity, reset } from './paziente.reducer';
import { IPaziente } from 'app/shared/model/paziente.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PazienteUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const prenotaziones = useAppSelector(state => state.prenotazione.entities);
  const pazienteEntity = useAppSelector(state => state.paziente.entity);
  const loading = useAppSelector(state => state.paziente.loading);
  const updating = useAppSelector(state => state.paziente.updating);
  const updateSuccess = useAppSelector(state => state.paziente.updateSuccess);

  const handleClose = () => {
    props.history.push('/paziente');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getPrenotaziones({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dataNascita = convertDateTimeToServer(values.dataNascita);

    const entity = {
      ...pazienteEntity,
      ...values,
      prenotazione: prenotaziones.find(it => it.id.toString() === values.prenotazioneId.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          dataNascita: displayDefaultDateTime(),
        }
      : {
          ...pazienteEntity,
          dataNascita: convertDateTimeFromServer(pazienteEntity.dataNascita),
          prenotazioneId: pazienteEntity?.prenotazione?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="frontEndApp.paziente.home.createOrEditLabel" data-cy="PazienteCreateUpdateHeading">
            <Translate contentKey="frontEndApp.paziente.home.createOrEditLabel">Create or edit a Paziente</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="paziente-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('frontEndApp.paziente.codiceFiscale')}
                id="paziente-codiceFiscale"
                name="codiceFiscale"
                data-cy="codiceFiscale"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.tesseraSanitaria')}
                id="paziente-tesseraSanitaria"
                name="tesseraSanitaria"
                data-cy="tesseraSanitaria"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.nome')}
                id="paziente-nome"
                name="nome"
                data-cy="nome"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.cognome')}
                id="paziente-cognome"
                name="cognome"
                data-cy="cognome"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.dataNascita')}
                id="paziente-dataNascita"
                name="dataNascita"
                data-cy="dataNascita"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.luogoNascita')}
                id="paziente-luogoNascita"
                name="luogoNascita"
                data-cy="luogoNascita"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.luogoResidenza')}
                id="paziente-luogoResidenza"
                name="luogoResidenza"
                data-cy="luogoResidenza"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.email')}
                id="paziente-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.telefono')}
                id="paziente-telefono"
                name="telefono"
                data-cy="telefono"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.paziente.password')}
                id="paziente-password"
                name="password"
                data-cy="password"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="paziente-prenotazione"
                name="prenotazioneId"
                data-cy="prenotazione"
                label={translate('frontEndApp.paziente.prenotazione')}
                type="select"
              >
                <option value="" key="0" />
                {prenotaziones
                  ? prenotaziones.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/paziente" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PazienteUpdate;
