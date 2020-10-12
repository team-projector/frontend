import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from '../../../../../enums/local-ui';
import { ViewType } from '../../../../../models/enums/view-type';
import { Salaries } from '../../../../shared/salaries/list/salaries';

@Component({
  selector: 'app-team-salaries',
  templateUrl: './team-salaries.component.html',
  styleUrls: ['./team-salaries.component.scss']
})

export class TeamSalariesComponent extends Salaries {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}