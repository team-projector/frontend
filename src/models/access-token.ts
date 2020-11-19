import { field, model } from '../decorators/model';
import { faker } from '../utils/mocks';
import { DateSerializer } from '../serializers/date';
import { mocks } from '../utils/mocks';

@model()
export class AccessToken {
  @field({mock: () => faker.random.uuid()})
  key: string;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  created: Date;
}
