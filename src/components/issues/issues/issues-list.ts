import {EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IssuesState, ViewType} from 'src/components/issues/issues/issues.component';
import {combineLatest} from 'rxjs';
import {serialize} from 'serialize-ts/dist';

export abstract class IssuesListComponent implements OnInit {

  viewType = ViewType;

  private _state = new IssuesState();

  @Output() reloaded = new EventEmitter();

  set state(state: IssuesState) {
    this._state = state;
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  get state() {
    return this._state;
  }

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    combineLatest(this.route.data, this.route.params)
      .subscribe(([{user, team, milestone, project, ticket, dueDate},
                    {q, sort, first, offset, type}]) => {
        this.state = new IssuesState({
          first: +first || undefined,
          offset: +offset || undefined,
          q: q,
          type: type,
          user: !!user ? user.id : user,
          team: !!team ? team.id : team,
          milestone: !!milestone ? milestone.id : undefined,
          project: !!project ? project.id : undefined,
          ticket: !!ticket ? ticket.id : undefined,
          dueDate: dueDate
        });
      });
  }

  getState(state: Object) {
    throw new Error('Must be overridden');
  }
}
