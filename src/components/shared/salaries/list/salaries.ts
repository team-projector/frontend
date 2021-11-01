import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { combineLatest } from 'rxjs';
import { serialize } from '@junte/serialize-ts';
import { SalariesState, SalariesStateUpdate } from './salaries-list.types';

export abstract class Salaries implements OnInit {

  ui = UI;

  state: SalariesState;

  protected constructor(private route: ActivatedRoute,
                        private router: Router) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user}, {first, offset}]) => {
        this.state = {
          first: +first || undefined,
          offset: +offset || undefined,
          user: user
        };
      });
  }

  save(state: SalariesStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
