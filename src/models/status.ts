import { ArraySerializer, DateSerializer, ModelSerializer } from 'serialize-ts';
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
    serializer: new ArraySerializer(new ModelSerializer(Issue)),
    mock: '[{{#repeat 5 10}} {{> issue }} {{/repeat}}]'
  })
  lastIssues: Issue[];

  @field({
    name: 'last_sync',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  lastSync: string;
}
