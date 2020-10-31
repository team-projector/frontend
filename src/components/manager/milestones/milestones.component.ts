import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from '../../../enums/local-ui';
import { ViewType } from '../../../models/enums/view-type';
import { MilestonesComponent } from '../../shared/milestones/list/milestones';

@Component({
  selector: 'app-manager-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class ManagerMilestonesComponent extends MilestonesComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
