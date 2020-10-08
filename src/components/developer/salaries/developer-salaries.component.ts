import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from '../../../enums/local-ui';
import { ViewType } from '../../../models/enums/view-type';
import { Salaries } from '../../shared/salaries/list/salaries';

@Component({
  selector: 'app-developer-salaries',
  templateUrl: './developer-salaries.component.html',
  styleUrls: ['./developer-salaries.component.scss']
})

export class DeveloperSalariesComponent extends Salaries {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
