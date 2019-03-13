import {Serializer} from 'serialize-ts';
import * as moment from 'moment';
import {Moment} from 'moment';

export class BooleanSerializer implements Serializer<boolean> {

  serialize(value: boolean): string {
    return value ? 'True' : 'False';
  }

  deserialize(source: string): boolean {
    return source === 'True';
  }
}
