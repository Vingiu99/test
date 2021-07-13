import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPrenotazione } from 'app/shared/model/prenotazione.model';
import { getEntities as getPrenotaziones } from 'app/entities/prenotazione/prenotazione.reducer';
import { getEntity, updateEntity, createEntity, reset } from './operatore.reducer';
import { IOperatore } from 'app/shared/model/operatore.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OperatoreUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const prenotaziones = useAppSelector(state => state.prenotazione.entities);
  const operatoreEntity = useAppSelector(state => state.operatore.entity);
  const loading = useAppSelector(state => state.operatore.loading);
  const updating = useAppSelector(state => state.operatore.updating);
  const updateSuccess = useAppSelector(state => state.operatore.updateSuccess);

  const handleClose = () => {
    props.history.push('/operatore');
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
      ...operatoreEntity,
      ...values,
      prenotaziones: mapIdList(values.prenotaziones),
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
          ...operatoreEntity,
          dataNascita: convertDateTimeFromServer(operatoreEntity.dataNascita),
          prenotaziones: operatoreEntity?.prenotaziones?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="frontEndApp.operatore.home.createOrEditLabel" data-cy="OperatoreCreateUpdateHeading">
            <Translate contentKey="frontEndApp.operatore.home.createOrEditLabel">Create or edit a Operatore</Translate>
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
                  id="operatore-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('frontEndApp.operatore.idAslOperatore')}
                id="operatore-idAslOperatore"
                name="idAslOperatore"
                data-cy="idAslOperatore"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.operatore.nome')}
                id="operatore-nome"
                name="nome"
                data-cy="nome"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.operatore.cognome')}
                id="operatore-cognome"
                name="cognome"
                data-cy="cognome"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.operatore.dataNascita')}
                id="operatore-dataNascita"
                name="dataNascita"
                data-cy="dataNascita"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.operatore.luogoNascita')}
                id="operatore-luogoNascita"
                name="luogoNascita"
                data-cy="luogoNascita"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.operatore.email')}
                id="operatore-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.operatore.telefono')}
                id="operatore-telefono"
                name="telefono"
                data-cy="telefono"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.operatore.password')}
                id="operatore-password"
                name="password"
                data-cy="password"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('frontEndApp.operatore.prenotazione')}
                id="operatore-prenotazione"
                data-cy="prenotazione"
                type="select"
                multiple
                name="prenotaziones"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/operatore" replace color="info">
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

export default OperatoreUpdate;
