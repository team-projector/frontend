import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from 'junte-ui';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { SalariesState } from 'src/components/salaries/salaries.component';
import { UserMetrics } from 'src/models/user';

@Component({
  selector: 'app-salaries-list',
  templateUrl: './salaries-list.component.html',
  styleUrls: ['./salaries-list.component.scss']
})

export class SalariesListComponent implements OnInit {

  private _state = new SalariesState();
  ui = UI;
  metrics: UserMetrics;

  set state(state: SalariesState) {
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
      .subscribe(([{user}, {first, offset}]) => {
        this.state = new SalariesState({
          first: +first || undefined,
          offset: +offset || undefined,
          user: !!user ? user.id : user
        });

        this.metrics = user.metrics;
      });
  }

  getState(state: Object) {
    delete state['user'];
    return state;
  }
}
