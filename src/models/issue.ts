import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {ObjectLink} from './object-link';
import {LabelCard} from './label';
import {Project} from './project';
import {Paging} from './paging';

export enum IssueState {
  opened = 'opened',
  closed = 'closed'
}

@Model()
@MockClass()
export class IssueCard {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{title}}')
  title: string;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(LabelCard)))
  @MockFieldNested('[{{#repeat 2 5}} {{> label_card}} {{/repeat}}]')
  labels: LabelCard[];

  @Field()
  @MockFieldNested('{{> object_link presentation=(project)}}')
  project: ObjectLink;

  @Field()
  @MockField('{{date \'2019\' \'2020\'}}')
  dueDate: Date;

  @Field()
  @Name('time_estimate')
  @MockField('{{seconds}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockField('{{seconds}}')
  timeSpend: number;

  @Field()
  @MockField('{{seconds}}')
  efficiency: number;

  @Field()
  @MockField('{{money}}')
  earnings: number;

  @Field()
  @MockField(IssueState.opened)
  state: IssueState;
}

@Model()
@MockClass()
export class Issue {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{title}}')
  title: string;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(LabelCard)))
  @MockFieldNested('[{{#repeat 2 5}} {{> label_card}} {{/repeat}}]')
  labels: LabelCard[];

  @Field()
  @MockFieldNested('{{> project}}')
  project: Project;

  @Field()
  @MockField('{{date \'2019\' \'2020\'}}')
  dueDate: Date;

  @Field()
  @Name('time_estimate')
  @MockField('{{seconds}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockField('{{seconds}}')
  timeSpend: number;

  @Field()
  @MockField('{{seconds}}')
  efficiency: number;

  @Field()
  @MockField('{{money}}')
  earnings: number;

  @Field()
  @MockField(IssueState.opened)
  state: IssueState;
}

@Model()
@MockClass()
export class PagingIssues implements Paging<IssueCard> {

  @Field()
  @MockField('{{seconds}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(IssueCard)))
  @MockFieldNested('[{{#repeat 10 50}} {{> issue_card}} {{/repeat}}]')
  results: IssueCard[];

}
