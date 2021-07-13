import dayjs from 'dayjs';
import { IPrenotazione } from 'app/shared/model/prenotazione.model';

export interface IPaziente {
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
  password?: string;
  prenotazione?: IPrenotazione | null;
}

export const defaultValue: Readonly<IPaziente> = {};
