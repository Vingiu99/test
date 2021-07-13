import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPaziente } from 'app/shared/model/paziente.model';
import { getEntities as getPazientes } from 'app/entities/paziente/paziente.reducer';
import { IOperatore } from 'app/shared/model/operatore.model';
import { getEntities as getOperatores } from 'app/entities/operatore/operatore.reducer';
import { getEntity, updateEntity, createEntity, reset } from './prenotazione.reducer';
import { IPrenotazione } from 'app/shared/model/prenotazione.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PrenotazioneUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const pazientes = useAppSelector(state => state.paziente.entities);
  const operatores = useAppSelector(state => state.operatore.entities);
  const prenotazioneEntity = useAppSelector(state => state.prenotazione.entity);
  const loading = useAppSelector(state => state.prenotazione.loading);
  const updating = useAppSelector(state => state.prenotazione.updating);
  const updateSuccess = useAppSelector(state => state.prenotazione.updateSuccess);

  const handleClose = () => {
    props.history.push('/prenotazione');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getPazientes({}));
    dispatch(getOperatores({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dataNascita = convertDateTimeToServer(values.dataNascita);
    values.dataVaccino = convertDateTimeToServer(values.dataVaccino);

    const entity = {
      ...prenotazioneEntity,
      ...values,
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
          dataVaccino: displayDefaultDateTime(),
        }
      : {
          ...prenotazioneEntity,
          dataNascita: convertDateTimeFromServer(prenotazioneEntity.dataNascita),
          dataVaccino: convertDateTimeFromServer(prenotazioneEntity.dataVaccino),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="frontEndApp.prenotazione.home.createOrEditLabel" data-cy="PrenotazioneCreateUpdateHeading">
            <Translate contentKey="frontEndApp.prenotazione.home.createOrEditLabel">Create or edit a Prenotazione</Translate>
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
                  id="prenotazione-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('frontEndApp.prenotazione.codiceFiscale')}
                id="prenotazione-codiceFiscale"
                name="codiceFiscale"
                data-cy="codiceFiscale"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.tesseraSanitaria')}
                id="prenotazione-tesseraSanitaria"
                name="tesseraSanitaria"
                data-cy="tesseraSanitaria"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.nome')}
                id="prenotazione-nome"
                name="nome"
                data-cy="nome"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.cognome')}
                id="prenotazione-cognome"
                name="cognome"
                data-cy="cognome"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.dataNascita')}
                id="prenotazione-dataNascita"
                name="dataNascita"
                data-cy="dataNascita"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.luogoNascita')}
                id="prenotazione-luogoNascita"
                name="luogoNascita"
                data-cy="luogoNascita"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.luogoResidenza')}
                id="prenotazione-luogoResidenza"
                name="luogoResidenza"
                data-cy="luogoResidenza"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.email')}
                id="prenotazione-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.telefono')}
                id="prenotazione-telefono"
                name="telefono"
                data-cy="telefono"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.luogoVaccino')}
                id="prenotazione-luogoVaccino"
                name="luogoVaccino"
                data-cy="luogoVaccino"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.prenotazione.dataVaccino')}
                id="prenotazione-dataVaccino"
                name="dataVaccino"
                data-cy="dataVaccino"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/prenotazione" replace color="info">
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

export default PrenotazioneUpdate;
