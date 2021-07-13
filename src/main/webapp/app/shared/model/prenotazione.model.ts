import dayjs from 'dayjs';
import { IPaziente } from 'app/shared/model/paziente.model';
import { IOperatore } from 'app/shared/model/operatore.model';

export interface IPrenotazione {
  id?: number;
  codiceFiscale?: string;
  tesseraSanitaria?: string;
  nome?: string;
  cognome?: string;
  dataNascita?: string;
  luogoNascita?: string;
  luogoResidenza?: string;
  email?: string;
  telefono?: string;
  luogoVaccino?: string;
  dataVaccino?: string;
  paziente?: IPaziente | null;
  operatores?: IOperatore[] | null;
}

export const defaultValue: Readonly<IPrenotazione> = {};
