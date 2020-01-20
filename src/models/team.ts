import * as faker from 'faker';
import { helpers } from 'faker';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';
import { TeamMemberRole } from 'src/models/enums/team';
import { IssuesMetrics } from 'src/models/metrics';
import { field, model } from '../decorators/model';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { Paging } from './paging';
import { User } from './user';

@model()
export class TeamMetrics {

  @field()
  issues: IssuesMetrics;

  @field({mock: () => faker.random.number({max: 10})})
  problemsCount: number;

}

@model()
export class TeamMember {

  @field()
  user: User;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: () => [helpers.randomize([TeamMemberRole.developer, TeamMemberRole.leader])]
  })
  roles: TeamMemberRole[];

}

@model()
export class Team {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({
    mock: () => helpers.randomize([
      'Mobile',
      'Frontend',
      'Backend'
    ])
  })
  title: string;

  @field({
    mock: {type: TeamMember, length: 5},
    serializer: new EdgesToArray(TeamMember),
  })
  members: TeamMember[];

  @field()
  metrics: TeamMetrics;
}

@model()
export class PagingTeams implements Paging<Team> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging(Team)),
    mock: {type: Team, length: 10}
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
