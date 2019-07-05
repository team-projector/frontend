import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { DateSerializer } from '../serializers/date';
import { IssueCard } from './issue';
import { field, model } from '@junte/mocker-library';

@model()
export class Service {

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  api: string;

  @field({
    name: 'web_hooks',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  webHooks: string;
}

@model()
export class Status {

  @field({mock: '{{> service}}'})
  services: Service;

  @field({
    name: 'last_issues',
    serializer: new ArraySerializer(new ModelSerializer(IssueCard)),
    mock: '[{{#repeat 5 10}} {{> issue_card }} {{/repeat}}]'
  })
  lastIssues: IssueCard[];

  @field({
    name: 'last_sync',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  lastSync: string;
}
