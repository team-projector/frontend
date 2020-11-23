import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { combineLatest } from 'rxjs';
import { serialize } from '@junte/serialize-ts';
import { ViewType } from 'src/models/enums/view-type';
import { IssueState } from 'src/models/enums/issue';
import { StandardLabel } from 'src/models/enums/standard-label';
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
      .subscribe(([{team, user, developer, project, dueDate}, {q, first, offset, type}]) => {
        this.logger.debug('read router data & params');
        this.state = {
          first: +first || null,
          offset: +offset || null,
          q: q,
          type: type,
          dueDate: dueDate,
          team: team || null,
          user: user || null,
          project: project || null,
          developer: developer || null
        };
      });
  }

  save(state: IssuesStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
