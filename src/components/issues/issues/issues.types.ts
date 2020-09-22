import { DATE_FORMAT } from '../../../consts';
import { field, model } from '../../../decorators/model';
import { IssuesType } from '../../../models/enums/issue';
import { Milestone } from '../../../models/milestone';
import { Project } from '../../../models/project';
import { Team } from '../../../models/team';
import { Ticket } from '../../../models/ticket';
import { User } from '../../../models/user';
import { DateSerializer } from '../../../serializers/date';

export interface IssuesState {
  first: number;
  offset: number;
  q: string;
  type: IssuesType;
  user: User;
  team: Team;
  milestone: Milestone;
  project: Project;
  ticket: Ticket;
  dueDate: Date;
}

@model()
export class IssuesStateUpdate {

  @field()
  q?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  type?: IssuesType;

  @field()
  team?: string;

  @field()
  user?: string;

  @field()
  project?: string;

  @field()
  milestone?: string;

  @field()
  ticket?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: Date;

  constructor(defs: Partial<IssuesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
