import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { ViewType } from 'src/models/enums/view-type';
import { IssueState } from '../../../models/enums/issue';
import { StandardLabel } from '../../../models/enums/standard-label';
import { IssuesState, IssuesStateUpdate } from './issues.types';

export abstract class IssuesListComponent implements OnInit {

  viewType = ViewType;
  issueState = IssueState;
  standardLabel = StandardLabel;

  state: IssuesState;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, team, milestone, project, ticket, dueDate}, {q, first, offset, type}]) => {
        this.logger.debug('read router data & params');
        this.state = {
          first: +first || undefined,
          offset: +offset || undefined,
          q: q,
          type: type,
          dueDate: dueDate,
          user: user || undefined,
          team: team || undefined,
          milestone: milestone || undefined,
          project: project || undefined,
          ticket: ticket || undefined
        };
      });
  }

  save(state: IssuesStateUpdate) {
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  getState(state: Object) {
    throw new Error('Must be overridden');
  }
}
