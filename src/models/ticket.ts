import { field, model } from '@junte/mocker-library';
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

  @field()
  id: string;

  @field()
  user: User;

  @field()
  title: string;

  @field({serializer: new EdgesToArray(Label)})
  labels: Label[];

  @field()
  project: Project;

  @field({serializer: new DateSerializer()})
  dueDate: Date;

  @field()
  timeEstimate: number;

  @field()
  timeSpent: number;

  @field()
  totalTimeSpent: number;

  @field()
  glUrl: string;

  @field({mock: IssueState.opened})
  state: IssueState;

  @field({serializer: new DateSerializer()})
  closedAt: Date;
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

  @field({serializer: new EdgesToArray(Issue)})
  issues: Issue[];

  @field()
  metrics: TicketMetrics;
}

@model()
export class TicketCreate {

  @field()
  milestone: string;

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

  @field({serializer: new ArraySerializer(new PrimitiveSerializer<string>())})
  issues: string[];

  constructor(update: TicketCreate) {
    Object.assign(this, update);
  }
}

@model()
export class TicketUpdate {

  @field()
  id: string;

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

  @field({serializer: new ArraySerializer(new PrimitiveSerializer<string>())})
  issues: string[];

  constructor(update: TicketUpdate) {
    Object.assign(this, update);
  }
}

@model()
export class PagingTickets implements Paging<Ticket> {

  @field()
  count: number;

  @field({
    name: 'edges',
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
