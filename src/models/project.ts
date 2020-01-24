import * as faker from 'faker';
import { helpers } from 'faker';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToArray } from '../serializers/graphql';

@model()
export class ProjectMilestone {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({
    mock: () => helpers.randomize([
      'MVP',
      'Sprint 1',
      'Version 1.0'
    ])
  })
  title: string;

  @field({mock: () => faker.date.future(), serializer: new DateSerializer()})
  dueDate: Date;
}

@model()
export class ProjectGroup {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({
    mock: () => helpers.randomize([
      'Microsoft',
      'Tesla',
      'Amazon'
    ])
  })
  title: string;

  @field()
  fullTitle: string;

  @field({mock: () => faker.image.business()})
  glAvatar: string;
}

@model()
export class Project {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({
    mock: () => helpers.randomize([
      'Azure',
      'Customers Billing',
      'CRM'
    ])
  })
  title: string;

  @field()
  fullTitle: string;

  @field({mock: ProjectGroup})
  group: ProjectGroup;

  @field({mock: () => faker.internet.url()})
  glUrl: string;

  @field({
    serializer: new EdgesToArray(ProjectMilestone),
    mock: {type: ProjectMilestone, length: 5}
  })
  milestones: ProjectMilestone[];
}
