import { ArraySerializer, Field, Model, ModelSerializer, Type } from 'serialize-ts';
import { MockClass, MockField, MockFieldNested } from '../decorators/mock';
import { UserCard } from './user';
import { Paging } from './paging';
import { PrimitiveSerializer } from 'serialize-ts/dist';

export enum TeamMemberRole {
  developer = 'developer',
  leader = 'leader'
}

@Model()
@MockClass()
export class TeamMemberCard {

  @Field()
  @MockFieldNested('{{> user_card}}')
  user: UserCard;

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
