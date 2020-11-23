import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { serialize } from '@junte/serialize-ts';
import { ViewType } from 'src/models/enums/view-type';
import { MilestonesState, MilestonesStateUpdate } from './milestones-list.types';

export abstract class MilestonesComponent implements OnInit {

  viewType = ViewType;

  state: MilestonesState;

  protected constructor(private route: ActivatedRoute,
                        private router: Router,
                        private logger: NGXLogger) {
  }

  ngOnInit() {
    this.route.params.subscribe(({first, offset, q, type}) => {
      this.logger.debug('read router data & params');
      this.state = {
        first: +first || undefined,
        offset: +offset || undefined,
        q: q,
        type: type,
      };
    });
  }

  save(state: MilestonesStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
