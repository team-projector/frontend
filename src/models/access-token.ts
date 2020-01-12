import { field, model } from '../decorators/model';
import * as faker from 'faker';
import { DateSerializer } from '../serializers/date';

@model()
export class AccessToken {
  @field({mock: () => faker.random.uuid()})
  key: string;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  created: Date;
}
