import { SearchFilter } from '@junte/ui';
import { addDays, startOfMonth } from 'date-fns';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts/dist';
import { DATE_FORMAT } from 'src/consts';
import { Milestone } from 'src/models/milestone';
import { Paging } from 'src/models/paging';
import { DateSerializer } from 'src/serializers/date';
import { EdgesToArray, EdgesToPaging } from 'src/serializers/graphql';
import { field, model } from '../decorators/model';
import { faker, mocks } from '../utils/mocks';
import { ModelRef } from '../utils/types';
import { TicketProblem, TicketStates, TicketTypes } from './enums/ticket';
import { Issue } from './issue';

@model()
export class TicketMetrics {

  @field({mock: () => mocks.money(5000, 10000)})
  customerPayroll: number;

  @field({mock: () => mocks.money(5000, 10000)})
  payroll: number;

  @field({mock: () => mocks.money(5000, 10000)})
  budgetSpent: number;

  @field({mock: () => mocks.money(5000, 10000)})
  budgetRemains: number;

  @field({mock: () => mocks.money(5000, 10000)})
  profit: number;

  @field({mock: () => mocks.time(0, 10)})
  timeEstimate: number;

  @field({mock: () => mocks.time(0, 10)})
  timeSpent: number;

  @field({mock: () => mocks.time(0, 10)})
  timeRemains: number;

  @field({mock: () => mocks.time(0, 10)})
  openedTimeRemains: number;

  @field({mock: () => mocks.efficiency()})
  efficiency: number;

  @field({mock: () => faker.random.number({min: 1, max: 10})})
  issuesCount: number;

  @field({mock: () => faker.random.number({min: 1, max: 10})})
  issuesOpenedCount: number;

  @field({mock: () => faker.random.number({min: 1, max: 10})})
  issuesClosedCount: number;

}

@model()
export class Ticket {

  @field({mock: context => context?.id || faker.random.uuid()})
  id: string;

  @field({
    mock: () => faker.helpers.randomize([
      TicketTypes.feature,
      TicketTypes.improvement,
      TicketTypes.bugFixing
    ])
  })
  type: TicketTypes;

  @field({
    mock: context => !!context && context.state != undefined ? context.state : faker.helpers.randomize([
      TicketStates.created,
      TicketStates.planning,
      TicketStates.doing,
      TicketStates.done,
      TicketStates.accepting,
      TicketStates.testing,
    ])
  })
  state: TicketStates;

  @field({
    mock: () => faker.helpers.randomize([
      $localize`:@@mocks.ticket_title_login:Login feature`,
      $localize`:@@mocks.ticket_title_emails:Sending emails`,
      $localize`:@@mocks.ticket_title_design:Design improvements`,
      $localize`:@@mocks.ticket_title_bug:Bug fixes`
    ])
  })
  title: string;

  @field()
  role: string;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  startDate: Date;

  @field({mock: () => faker.date.future(), serializer: new DateSerializer()})
  dueDate: Date;

  @field({mock: () => faker.internet.url()})
  url: string;

  @field({
    mock: {
      type: () => Issue,
      length: 5
    },
    serializer: new EdgesToArray(() => Issue)
  })
  issues: ModelRef<Issue>[];

  @field({mock: TicketMetrics})
  metrics: TicketMetrics;

  @field({mock: Milestone})
  milestone: Milestone;

  @field({
    mock: [],
    serializer: new ArraySerializer(new PrimitiveSerializer())
  })
  problems: TicketProblem[];
}


@model()
export class TicketUpdate {

  @field()
  id: string;

  @field()
  milestone: string;

  @field()
  type: TicketTypes;

  @field()
  state: TicketStates;

  @field()
  title: string;

  @field()
  role: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  startDate: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate: Date;

  @field()
  url: string;

  @field({serializer: new ArraySerializer(new PrimitiveSerializer<string>())})
  issues: string[];

  constructor(update: TicketUpdate) {
    Object.assign(this, update);
  }
}

@model({
  mocking: (paging: PagingTickets) => {
    const start = startOfMonth(new Date());
    paging.results.forEach((ticket, i) => {
      ticket.startDate = addDays(start, i);
      ticket.dueDate = addDays(ticket.startDate, faker.random.number({min: 1, max: 10}));
    });
  }
})
export class PagingTickets implements Paging<Ticket> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    mock: {type: Ticket, length: 10},
    serializer: new ArraySerializer(new EdgesToPaging<Ticket>(Ticket))
  })
  results: Ticket[];
}

@model()
export class TicketsFilter implements SearchFilter {

  @field()
  milestone: string;

  @field()
  state: string;

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

@model()
export class TicketsSummary {

  @field({mock: () => mocks.random(90, 120)})
  count: number;

  @field({mock: () => mocks.random(20, 30)})
  createdCount: number;

  @field({mock: () => mocks.random(8, 15)})
  planningCount: number;

  @field({mock: () => mocks.random(7, 15)})
  doingCount: number;

  @field({mock: () => mocks.random(8, 15)})
  testingCount: number;

  @field({mock: () => mocks.random(7, 15)})
  acceptingCount: number;

  @field({mock: () => mocks.random(8, 15)})
  doneCount: number;
}
