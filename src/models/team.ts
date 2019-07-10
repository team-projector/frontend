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
export class TeamMember {

  @Field()
  @MockFieldNested('{{> user}}')
  user: User;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([TeamMemberRole.developer])
  roles: TeamMemberRole[];

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
  @MockField('{{int 3 10}}')
  membersCount: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(TeamMember)))
  @MockFieldNested('[{{#repeat 5 15}} {{> team_member }} {{/repeat}}]')
  members: TeamMember[];

  @Field()
  @MockFieldNested('{{> team_metrics}}')
  metrics: TeamMetrics;
}

@Model()
@MockClass()
export class PagingTeams implements Paging<Team> {

  @Field()
  @MockFieldNested('{{int 3 10}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(Team)))
  @MockFieldNested('[{{#repeat 3 10}} {{> team}} {{/repeat}}]')
  results: Team[];
}

@Model()
@MockClass()
export class PagingTeamMembers implements Paging<TeamMember> {

  @Field()
  @MockFieldNested('{{int 2 7}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(TeamMember)))
  @MockFieldNested('[{{#repeat 2 7}} {{> team_member}} {{/repeat}}]')
  results: TeamMember[];

}
