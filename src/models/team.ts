import {ArraySerializer, Field, Model, ModelSerializer, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {User} from './user';
import {Paging} from './paging';
import {Name, PrimitiveSerializer} from 'serialize-ts/dist';

export enum TeamMemberRole {
  developer = 'developer',
  leader = 'leader',
  watcher = 'watcher'
}

@Model()
@MockClass()
export class TeamMetrics {

  @Field()
  @Name('issues_count')
  @MockFieldNested('{{int 10 100}}')
  issuesCount: number;

  @Field()
  @Name('problems_count')
  @MockFieldNested('{{int 10 100}}')
  problemsCount: number;

}

@Model()
@MockClass()
export class Team {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{team}}')
  title: string;

  @Field()
  @MockFieldNested('{{> team_metrics}}')
  metrics: TeamMetrics;
}

@Model()
@MockClass()
export class TeamMemberCard {

  @Field()
  @MockFieldNested('{{> user_card}}')
  user: User;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([TeamMemberRole.developer])
  roles: TeamMemberRole[];

}

@Model()
@MockClass()
export class TeamCard {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{team}}')
  title: string;

  @Field()
  @MockField('{{int 3 10}}')
  membersCount: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(TeamMemberCard)))
  @MockFieldNested('[{{#repeat 5 15}} {{> team_member_card }} {{/repeat}}]')
  members: TeamMemberCard[];

  @Field()
  @MockFieldNested('{{> team_metrics}}')
  metrics: TeamMetrics;
}

@Model()
@MockClass()
export class PagingTeams implements Paging<TeamCard> {

  @Field()
  @MockFieldNested('{{int 3 10}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(TeamCard)))
  @MockFieldNested('[{{#repeat 3 10}} {{> team_card}} {{/repeat}}]')
  results: TeamCard[];
}

@Model()
@MockClass()
export class PagingTeamMembers implements Paging<TeamMemberCard> {

  @Field()
  @MockFieldNested('{{int 2 7}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(TeamMemberCard)))
  @MockFieldNested('[{{#repeat 2 7}} {{> team_member_card}} {{/repeat}}]')
  results: TeamMemberCard[];

}
