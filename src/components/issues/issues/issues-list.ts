import { EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { ViewType } from 'src/models/enums/view-type';
import { IssuesState } from './issues.types';

export abstract class IssuesListComponent implements OnInit {

  state: IssuesState;
  viewType = ViewType;

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
          user: !!user ? user.id : user,
          team: !!team ? team.id : team,
          milestone: !!milestone ? milestone.id : undefined,
          project: project || undefined,
          ticket: !!ticket ? ticket.id : undefined,
          dueDate: dueDate
        };
      });
  }

  save(state: IssuesState) {
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  getState(state: Object) {
    throw new Error('Must be overridden');
  }
}
