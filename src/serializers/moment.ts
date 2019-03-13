import {Serializer} from 'serialize-ts';
import * as moment from 'moment';
import {Moment} from 'moment';

export class MomentSerializer implements Serializer<Moment> {
  constructor(private format: string = null) {

  }

  serialize(date: Moment): string {
    return date.format(this.format);
  }

  deserialize(source: string): Moment {
    return moment(source, this.format);
  }
}