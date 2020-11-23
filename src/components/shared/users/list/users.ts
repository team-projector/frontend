import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { serialize } from '@junte/serialize-ts';
import { UsersState, UsersStateUpdate } from './users-list.types';

export abstract class Users implements OnInit {

  state: UsersState;

  protected constructor(private route: ActivatedRoute,
                        private router: Router,
                        private logger: NGXLogger) {
  }

  ngOnInit() {
    this.route.params.subscribe(({first, offset}) => {
      this.logger.debug('read router data & params');
      this.state = {
        first: +first || undefined,
        offset: +offset || undefined
      };
    });
  }

  save(state: UsersStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
