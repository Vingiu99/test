import dayjs from 'dayjs';
import { IPrenotazione } from 'app/shared/model/prenotazione.model';

export interface IOperatore {
  id?: number;
  idAslOperatore?: string;
  nome?: string;
  cognome?: string;
  dataNascita?: string;
  luogoNascita?: string;
  email?: string;
  telefono?: string;
  password?: string;
  prenotaziones?: IPrenotazione[] | null;
}

export const defaultValue: Readonly<IOperatore> = {};
