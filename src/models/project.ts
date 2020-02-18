import { faker } from '../utils/mocks';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToArray } from '../serializers/graphql';

@model()
export class ProjectMilestone {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({
    mock: () => faker.helpers.randomize([
      $localize`:@@mocks.milestone_mvp:MVP`,
      $localize`:@@mocks.milestone_sprint:Sprint 1`,
      $localize`:@@mocks.milestone_version:Version 1.0`
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
    mock: () => faker.helpers.randomize([
      'Microsoft',
      'Tesla',
      'Amazon'
    ])
  })
  title: string;

  @field({
    mock: () => faker.helpers.randomize([
      'Software / Microsoft',
      'Producers / Tesla',
      'Trading / Amazon'
    ])
  })
  fullTitle: string;

  @field({mock: () => faker.image.business()})
  glAvatar: string;
}

@model()
export class Project {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({
    mock: () => faker.helpers.randomize([
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
