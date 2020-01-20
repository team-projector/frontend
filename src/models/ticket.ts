import * as faker from 'faker';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts/dist';
import { DATE_FORMAT } from 'src/consts';
import { IssueState } from 'src/models/enums/issue';
import { Label } from 'src/models/label';
import { Paging } from 'src/models/paging';
import { Project } from 'src/models/project';
import { User } from 'src/models/user';
import { DateSerializer } from 'src/serializers/date';
import { EdgesToArray, EdgesToPaging } from 'src/serializers/graphql';
import { field, model } from '../decorators/model';
import { TicketProblem } from './enums/ticket';

export enum TicketTypes {
  feature = 'FEATURE',
  improvement = 'IMPROVEMENT',
  bugFixing = 'BUG_FIXING'
}

@model()
export class TicketMetrics {

  @field()
  customerPayroll: number;

  @field()
  payroll: number;

  @field()
  budgetSpent: number;

  @field()
  budgetRemains: number;

  @field()
  profit: number;

  @field()
  timeEstimate: number;

  @field()
  timeSpent: number;

  @field()
  timeRemains: number;

  @field()
  efficiency: number;

  @field()
  issuesCount: number;

  @field()
  issuesOpenedCount: number;

  @field()
  issuesClosedCount: number;

}

@model()
export class Issue {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field()
  user: User;

  @field({
    mock: () => faker.helpers.randomize([
      'Implement design for login feature',
      'GraphQL API for login',
      'Fix bugs in login form'
    ])
  })
  title: string;

  @field({mock: {type: Label, length: 3}, serializer: new EdgesToArray(Label)})
  labels: Label[];

  @field()
  project: Project;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  dueDate: Date;

  @field({mock: () => faker.random.number()})
  timeEstimate: number;

  @field({mock: () => faker.random.number()})
  timeSpent: number;

  @field({mock: () => faker.random.number()})
  totalTimeSpent: number;

  @field()
  glUrl: string;

  @field({mock: IssueState.opened})
  state: IssueState;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  closedAt: Date;
}

@model()
export class Ticket {

  @field({mock: context => !!context && !!context.id ? context.id : faker.random.uuid()})
  id: string;

  @field()
  type: TicketTypes;

  @field({
    mock: () => faker.helpers.randomize([
      'Login feature',
      'Bug fixes'
    ])
  })
  title: string;

  @field()
  role: string;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  startDate: Date;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  dueDate: Date;

  @field({mock: () => faker.internet.url()})
  url: string;

  @field({serializer: new EdgesToArray(Issue)})
  issues: Issue[];

  @field()
  metrics: TicketMetrics;

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

@model()
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
