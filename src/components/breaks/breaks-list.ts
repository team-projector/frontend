import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { serialize } from 'serialize-ts/dist';
import { BreaksState } from 'src/components/breaks/breaks-table/breaks-table.component';
import { ViewType } from 'src/models/enums/view-type';

export abstract class BreaksListComponent implements OnInit {

  private _state = new BreaksState();

  viewType = ViewType;

  set state(state: BreaksState) {
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
      .pipe(debounceTime(0))
      .subscribe(([{user, team}, {q, first, offset}]) => {
        this.state = new BreaksState({
          first: +first || undefined,
          offset: +offset || undefined,
          q: q,
          user: !!user ? user.id : user,
          team: !!team ? team.id : team
        });
      });
  }

  getState(state: Object) {
    throw new Error('Must be overriden');
  }
}
