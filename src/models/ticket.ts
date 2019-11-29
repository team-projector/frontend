import { field, model } from '@junte/mocker-library';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer } from 'serialize-ts/dist';
import { DATE_FORMAT } from 'src/consts';
import { Paging } from 'src/models/paging';
import { DateSerializer } from 'src/serializers/date';
import { EdgesToPaging } from 'src/serializers/graphql';

export enum TicketTypes {
  feature = 'FEATURE',
  improvement = 'IMPROVEMENT',
  bugFixing = 'BUG_FIXING'
}

@model()
export class TicketMetrics {

  @field({mock: '{{money}}'})
  customerPayroll: number;

  @field({mock: '{{money}}'})
  payroll: number;

  @field({mock: '{{money}}'})
  budgetSpent: number;

  @field({mock: '{{money}}'})
  budgetRemains: number;

  @field({mock: '{{money}}'})
  profit: number;

  @field({mock: '{{int 10 100}}'})
  timeEstimate: number;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;

  @field({mock: '{{int 10 100}}'})
  timeRemains: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({mock: '{{int 10 100}}'})
  issuesCount: number;

  @field({mock: '{{int 10 100}}'})
  issuesOpenedCount: number;

  @field({mock: '{{int 10 100}}'})
  issuesClosedCount: number;

}

@model()
export class Ticket {

  @field()
  id: string;

  @field()
  type: TicketTypes;

  @field()
  title: string;

  @field()
  startDate: Date;

  @field()
  dueDate: Date;

  @field()
  url: string;

  @field({mock: '{{> milestone_metrics}}'})
  metrics: TicketMetrics;
}

@model()
export class TicketUpdate {

  @field()
  id: number;

  @field()
  milestone: number;

  @field()
  type: TicketTypes;

  @field()
  title: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  startDate: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate: Date;

  @field()
  url: string;

  constructor(update: TicketUpdate) {
    Object.assign(this, update);
  }
}

@model()
export class PagingTickets implements Paging<Ticket> {

  @field({mock: '{{int 3 10}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Ticket>(Ticket)),
    mock: '[{{#repeat 3 10}} {{> milestone_ticket}} {{/repeat}}]'
  })
  results: Ticket[];
}

@model()
export class TicketsFilter implements SearchFilter {

  @field()
  milestone: string;

  @field()
  orderBy?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: TicketsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
