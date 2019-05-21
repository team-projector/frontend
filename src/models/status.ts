import { ArraySerializer, Field, Model, ModelSerializer, Name, Type } from 'serialize-ts';
import { MockClass, MockField, MockFieldNested } from '../decorators/mock';
import { DateSerializer } from '../serializers/date';
import { IssueCard } from './issue';

@Model()
@MockClass()
export class Service {

  @Field()
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  api: string;

  @Field()
  @Name('web_hooks')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  webHooks: string;
}

@Model()
@MockClass()
export class Status {

  @Field()
  @MockFieldNested('{{> service}}')
  services: Service;

  @Field()
  @Name('last_issues')
  @Type(new ArraySerializer(new ModelSerializer(IssueCard)))
  @MockFieldNested('[{{#repeat 5 10}} {{> issue_card }} {{/repeat}}]')
  lastIssues: IssueCard[];

  @Field()
  @Name('last_sync')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  lastSync: string;
}
