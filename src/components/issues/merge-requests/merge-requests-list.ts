import { EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { MergeRequestsState } from 'src/components/issues/merge-requests/merge-requests.component';

export abstract class MergeRequestsListComponent implements OnInit {

  private _state = new MergeRequestsState();
  @Output() reloaded = new EventEmitter();

  set state(state: MergeRequestsState) {
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
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, team, project}, {q, first, offset, state}]) => {
        this.state = new MergeRequestsState({
          first: +first || undefined,
          offset: +offset || undefined,
          q: q,
          state: state,
          user: !!user ? user.id : user,
          team: !!team ? team.id : team,
          project: !!project ? project.id : undefined,
        });
      });
  }

  getState(state: Object) {
    throw new Error('Must be overridden');
  }
}
