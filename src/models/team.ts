import { field, model } from '../decorators/model';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';
import { IssuesMetrics } from 'src/models/metrics';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { Paging } from './paging';
import { User } from './user';

export enum TeamMemberRole {
  developer = 'DEVELOPER',
  leader = 'LEADER',
  watcher = 'WATCHER'
}

@model()
export class TeamMetrics {

  @field()
  issues: IssuesMetrics;

  @field({
    mock: ''
  })
  problemsCount: number;

}

@model()
export class TeamMember {

  @field({mock: ''})
  user: User;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [TeamMemberRole.developer]
  })
  roles: TeamMemberRole[];

}

@model()
export class Team {

  @field({mock: ''})
  id: string;

  @field({mock: ''})
  title: string;

  @field({
    serializer: new EdgesToArray(TeamMember),
    mock: ''
  })
  members: TeamMember[];

  @field({mock: ''})
  metrics: TeamMetrics;
}

@model()
export class PagingTeams implements Paging<Team> {

  @field({mock: ''})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Team>(Team)),
    mock: ''
  })
  results: Team[];
}

@model()
export class PagingTeamMembers implements Paging<TeamMember> {

  @field({mock: ''})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<TeamMember>(TeamMember)),
    mock: ''
  })
  results: TeamMember[];
}
