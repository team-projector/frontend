import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { serialize } from 'serialize-ts/dist';
import { ViewType } from '../../../../models/enums/view-type';
import { ProjectGroupsState, ProjectGroupsStateUpdate } from './project-groups-list.types';

export abstract class ProjectGroups implements OnInit {

  viewType = ViewType;

  state: ProjectGroupsState;

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

  save(state: ProjectGroupsStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
