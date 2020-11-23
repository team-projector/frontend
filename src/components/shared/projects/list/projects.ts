import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { serialize } from '@junte/serialize-ts';
import { ViewType } from 'src/models/enums/view-type';
import { ProjectsState, ProjectsStateUpdate } from './projects-list.types';

export abstract class Projects implements OnInit {

  viewType = ViewType;

  state: ProjectsState;

  protected constructor(private route: ActivatedRoute,
                        private router: Router,
                        private logger: NGXLogger) {
  }

  ngOnInit() {
    this.route.params.subscribe(({type, first, offset}) => {
      this.logger.debug('read router data & params');
      this.state = {
        first: +first || undefined,
        offset: +offset || undefined,
        type: type || null
      };
    });
  }

  save(state: ProjectsStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
