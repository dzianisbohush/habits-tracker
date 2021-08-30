import moment from 'moment';

export const KEY_DATE_FORMAT = 'YYYY-MM-DD';
export const TODAY = moment().format(KEY_DATE_FORMAT);
export const TODAY_VIEW = moment().format('LL');
