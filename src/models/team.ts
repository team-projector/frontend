import {ArraySerializer, ModelSerializer, PrimitiveSerializer} from 'serialize-ts';
import {field, model} from '@junte/mocker-library';
import {User} from './user';
import {EdgesToArray, EdgesToPaging} from '../serializers/graphql';
import {Paging} from './paging';
import {IssueMetrics, IssuesMetrics} from './issue';

export enum TeamMemberRole {
  developer = 'developer',
  leader = 'leader',
  watcher = 'watcher'
}

@model()
export class TeamMetrics {

  @field()
  issues: IssuesMetrics;

  @field({
    mock: '{{int 10 100}}'
  })
  problemsCount: number;

}

@model()
export class TeamMember {

  @field({mock: '{{> user}}'})
  user: User;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [TeamMemberRole.developer]
  })
  roles: TeamMemberRole[];

}

@model()
export class Team {

  @field({mock: '{{int 1 1000}}'})
  id: string;

  @field({mock: '{{team}}'})
  title: string;

  @field({
    serializer: new EdgesToArray(TeamMember),
    mock: '[{{#repeat 5 15}} {{> team_member }} {{/repeat}}]'
  })
  members: TeamMember[];

  @field({mock: '{{> team_metrics}}'})
  metrics: TeamMetrics;
}

@model()
export class PagingTeams implements Paging<Team> {

  @field({mock: '{{int 3 10}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Team>(Team)),
    mock: '[{{#repeat 3 10}} {{> team}} {{/repeat}}]'
  })
  results: Team[];
}

@model()
export class PagingTeamMembers implements Paging<TeamMember> {

  @field({mock: '{{int 3 10}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<TeamMember>(TeamMember)),
    mock: '[{{#repeat 3 10}} {{> team_member}} {{/repeat}}]'
  })
  results: TeamMember[];
}
