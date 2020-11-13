import { format } from 'date-fns';
import { Serializer } from 'serialize-ts';
import { DFNS_OPTIONS } from 'src/consts';

export class DateSerializer implements Serializer<Date> {
  constructor(private f: string = null) {

  }

  serialize(date: Date): string {
    return format(date, this.f, DFNS_OPTIONS);
  }

  deserialize(source: string): Date {
    return new Date(source);
  }
}
