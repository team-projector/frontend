import {ArraySerializer, ModelSerializer, Field, Type, Model} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {UserCard} from './user';
import {Paging} from './paging';
import {IssueCard} from './issue';
import {PrimitiveSerializer} from 'serialize-ts/dist';

export enum TeamMemberRole {
  developer = 'developer',
  leader = 'leader'
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

}

@Model()
@MockClass()
export class PagingTeams implements Paging<TeamCard> {

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(TeamCard)))
  @MockFieldNested('[{{#repeat 10 20}} {{> team_card}} {{/repeat}}]')
  results: IssueCard[];

}

@Model()
@MockClass()
export class TeamMemberCard {

  @Field()
  @MockFieldNested('{{> user_card}}')
  user: UserCard;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockFieldNested([TeamMemberRole.developer])
  roles: TeamMemberRole[];

}

@Model()
@MockClass()
export class PagingTeamMembers implements Paging<TeamMemberCard> {

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(TeamMemberCard)))
  @MockFieldNested('[{{#repeat 10 20}} {{> team_member_card}} {{/repeat}}]')
  results: TeamMemberCard[];

}
