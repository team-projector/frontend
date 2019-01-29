import {Field, Model, Name} from 'serialize-ts';

export enum Order {
  asc = 'asc',
  desc = 'desc'
}

export interface SearchFilter {
  sort?: string;
  order?: Order;
  page?: number;
  pageSize?: number;
}

@Model()
export class DefaultSearchFilter implements SearchFilter {

  @Field()
  sort?: string;

  @Field()
  order?: Order = Order.asc;

  @Field()
  page?: number;

  @Field()
  @Name('page_size')
  pageSize?: number;

  constructor(defs: DefaultSearchFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
