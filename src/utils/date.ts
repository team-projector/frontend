import * as moment from 'moment';
import {Moment} from 'moment';

export function today(): Moment {
  return moment().startOf('day');
}
