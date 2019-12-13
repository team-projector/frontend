import { ArrayType } from '@angular/compiler';
import { field, model } from '@junte/mocker-library';
import { ArraySerializer, DateSerializer, Serializer, ModelSerializer } from 'serialize-ts';
import { EdgesToArray } from '../serializers/graphql';
import { Issue } from './issue';

export class GitLabServicesSerializer implements Serializer<GitLabServices> {
  serialize(services: GitLabServices): Object {
    return [{name: 'web_hooks', time: services.webHooks},
      {name: 'api', time: services.api}];
  }

  deserialize(source: { name, time }[]): GitLabServices {
    const services = new GitLabServices();
    for (const service of source) {
      switch (service.name) {
        case 'web_hooks':
          services.webHooks = new Date(service.time);
          break;
        case 'api':
          services.api = new Date(service.time);
          break;
        default:
          throw new Error('Service name is not recognized');
      }
    }
    return services;
  }
}

@model()
export class GitLabServices {

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  api: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  webHooks: Date;
}

@model()
export class GitLabStatus {

  @field({
    serializer: new GitLabServicesSerializer(),
    mock: '{{> service}}'
  })
  services: GitLabServices;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(Issue)),
    mock: '[{{#repeat 5 10}} {{> issue }} {{/repeat}}]'
  })
  lastIssues: Issue[];

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  lastSync: string;
}
