import { ArraySerializer, ModelSerializer, PrimitiveSerializer } from 'serialize-ts';
import { User } from './user';
import { Paging } from './paging';
import { field, model } from '@junte/mocker-library';

export enum TeamMemberRole {
  developer = 'developer',
  leader = 'leader',
  watcher = 'watcher'
}

@model()
export class TeamMetrics {

  @field({
    name: 'issues_count',
    mock: '{{int 10 100}}'
  })
  issuesCount: number;

  @field({
    name: 'problems_count',
    mock: '{{int 10 100}}'
  })
  problemsCount: number;

}

@model()
export class TeamMember {

  @field({mock: '{{> user}}'})
  user: User;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([TeamMemberRole.developer])
  roles: TeamMemberRole[];

}

@model()
export class Team {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({mock: '{{team}}'})
  title: string;

  @field({mock: '{{int 3 10}}'})
  membersCount: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(TeamMember)),
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
    serializer: new ArraySerializer(new ModelSerializer(Team)),
    mock: '[{{#repeat 3 10}} {{> team}} {{/repeat}}]'
  })
  results: Team[];
}

@model()
export class PagingTeamMembers implements Paging<TeamMemberCard> {

  @field({mock: '{{int 2 7}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(TeamMember)),
    mock: '[{{#repeat 2 7}} {{> team_member}} {{/repeat}}]'
  })
  results: TeamMember[];

}
