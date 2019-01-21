import {IssueCard} from './issue';
import {ArraySerializer, Field, ModelSerializer, Type} from 'serialize-ts';

export class Paging<T> {
  count: number;
  results: T[];
}

export class PagingIssues extends Paging<IssueCard> {

  @Field()
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(IssueCard)))
  results: IssueCard[];

}
