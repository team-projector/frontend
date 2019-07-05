import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { UserCard } from './user';
import { Paging } from './paging';
import { PrimitiveSerializer } from 'serialize-ts/dist';
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
export class Team {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({mock: '{{team}}'})
  title: string;

  @field({mock: '{{> team_metrics}}'})
  metrics: TeamMetrics;
}

@model()
export class TeamMemberCard {

  @field({mock: '{{> user_card}}'})
  user: UserCard;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [TeamMemberRole.developer]
  })
  roles: TeamMemberRole[];

}

@model()
export class TeamCard {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({mock: '{{team}}'})
  title: string;

  @field({mock: '{{int 3 10}}'})
  membersCount: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(TeamMemberCard)),
    mock: '[{{#repeat 5 15}} {{> team_member_card }} {{/repeat}}]'
  })
  members: TeamMemberCard[];

  @field({mock: '{{> team_metrics}}'})
  metrics: TeamMetrics;
}

@model()
export class PagingTeams implements Paging<TeamCard> {

  @field({mock: '{{int 3 10}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(TeamCard)),
    mock: '[{{#repeat 3 10}} {{> team_card}} {{/repeat}}]'
  })
  results: TeamCard[];
}

@model()
export class PagingTeamMembers implements Paging<TeamMemberCard> {

  @field({mock: '{{int 2 7}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(TeamMemberCard)),
    mock: '[{{#repeat 2 7}} {{> team_member_card}} {{/repeat}}]'
  })
  results: TeamMemberCard[];

}
