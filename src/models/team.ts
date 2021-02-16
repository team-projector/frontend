import { ArraySerializer, ModelSerializer, PrimitiveSerializer } from '@junte/serialize-ts';
import { TeamMemberRole } from 'src/models/enums/team';
import { IssuesMetrics } from 'src/models/metrics';
import { mocks } from 'src/utils/mocks';
import { DATE_FORMAT } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { faker } from '../utils/mocks';
import { Metrics } from './enums/metrics';
import { Paging } from './paging';
import { User, UserProgressMetrics } from './user';

@model({
  mocking: (member: TeamMember, filter: Object, index: number) => {
    member.user.id = `${index}`;
  }
})
export class TeamMember {

  @field({mock: User})
  user: User;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: () => [TeamMemberRole.developer]
  })
  roles: TeamMemberRole[];

}

@model()
export class TeamMetrics {

  @field({mock: IssuesMetrics})
  issues: IssuesMetrics;

  @field({mock: () => mocks.random(0, 10)})
  problemsCount: number;

}

@model({
  mocking: (team: Team) => {
    team.members.forEach((m, i) => m.user.id = `${i}`);
  }
})
export class Team {

  @field({mock: context => context?.id || mocks.id()})
  id: string;

  @field({
    mock: () => {
      const title = faker.helpers.randomize(['Mobile', 'Frontend', 'Backend']);
      const city = faker.address.city();
      return `${title} ${city}`;
    }
  })
  title: string;

  @field({
    mock: {type: TeamMember, length: 5},
    serializer: new EdgesToArray(TeamMember)
  })
  members: TeamMember[];

  @field({mock: TeamMetrics})
  metrics: TeamMetrics;
}

@model()
export class PagingTeams implements Paging<Team> {

  @field({mock: () => mocks.random(3, 10)})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging(Team)),
    mock: {type: Team, length: 15}
  })
  results: Team[];
}

@model()
export class PagingTeamMembers implements Paging<TeamMember> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging(TeamMember)),
    mock: {type: TeamMember, length: 5}
  })
  results: TeamMember[];
}

@model()
export class TeamsFilter {

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: Partial<TeamsFilter> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class TeamMembersFilter {

  @field()
  team: string;

  constructor(defs: Partial<TeamMembersFilter> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class TeamMetricsFilter {

  @field()
  team: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  start: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  end: Date;

  @field()
  group: Metrics;

  constructor(defs: TeamMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model({
  mocking: (metrics: TeamMemberProgressMetrics, filter: Object, index: number) => {
    metrics.user.id = `${index}`;
  }
})
export class TeamMemberProgressMetrics {

  @field({mock: User})
  user: User;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(UserProgressMetrics)),
    mock: {type: UserProgressMetrics, length: 10}
  })
  metrics: UserProgressMetrics[];
}
