import { Serializer } from 'serialize-ts';
import { format } from 'date-fns';

export class DateSerializer implements Serializer<Date> {
  constructor(private f: string = null) {

  }

  serialize(date: Date): string {
    return format(date, this.f);
  }

  deserialize(source: string): Date {
    return new Date(source);
  }
}
