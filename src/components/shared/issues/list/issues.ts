import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { ViewType } from 'src/models/enums/view-type';
import { IssueState } from '../../../../models/enums/issue';
import { StandardLabel } from '../../../../models/enums/standard-label';
import { IssuesState, IssuesStateUpdate } from './issues-list.types';

export abstract class IssuesComponent implements OnInit {

  viewType = ViewType;
  issueState = IssueState;
  standardLabel = StandardLabel;

  state: IssuesState;

  protected constructor(private route: ActivatedRoute,
              private router: Router,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, developer, team, project, dueDate}, {q, first, offset, type}]) => {
        this.logger.debug('read router data & params');
        this.state = {
          first: +first || undefined,
          offset: +offset || undefined,
          q: q,
          type: type,
          dueDate: dueDate,
          user: user || undefined,
          team: team || undefined,
          project: project || undefined,
          developer: developer || undefined
        };
      });
  }

  save(state: IssuesStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
