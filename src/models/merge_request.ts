import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {ObjectLink} from './object-link';
import {LabelCard} from './label';
import {UserCard} from './user';

export enum MergeRequestState {
  opened = 'opened',
  closed = 'closed'
}

@Model()
@MockClass()
export class MergeRequestCard {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{issue}}')
  title: string;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(LabelCard)))
  @MockFieldNested('[{{#repeat 2 5}} {{> label_card}} {{/repeat}}]')
  labels: LabelCard[];

  @Field()
  @MockFieldNested('{{> object_link presentation=(project)}}')
  project: ObjectLink;

  @Field()
  @Name('time_estimate')
  @MockFieldNested('{{int 10 100}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{int 10 100}}')
  timeSpent: number;

  @Field()
  @Name('total_time_spent')
  @MockFieldNested('{{int 10 100}}')
  totalTimeSpent: number;

  @Field()
  @Name('gl_url')
  @MockField('{{url}}')
  glUrl: string;

  @Field()
  @MockField(MergeRequestState.opened)
  state: MergeRequestState;

  @Field()
  @MockFieldNested('{{> user_card}}')
  user: UserCard;
}
