import { Serializer } from '@junte/serialize-ts';
import { SECONDS_IN_HOUR } from '../consts';

export class HourToSecondsSerializer implements Serializer<number> {
  serialize(hours: number): number {
    return hours * SECONDS_IN_HOUR;
  }

  deserialize(source: number): number {
    throw new Error('Was not implemented');
  }
}
