import { faker } from '../utils/mocks';
import { ArraySerializer, DateSerializer, ModelSerializer, Serializer } from '@junte/serialize-ts';
import { field, model } from '../decorators/model';
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

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  api: Date;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  webHooks: Date;
}

@model()
export class GitLabStatus {

  @field({mock: GitLabServices, serializer: new GitLabServicesSerializer()})
  services: GitLabServices;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(Issue)),
    mock: {type: Issue, length: 10}
  })
  lastIssues: Issue[];

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  lastSync: Date;
}
