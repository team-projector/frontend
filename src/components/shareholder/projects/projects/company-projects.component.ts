import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from '../../../../enums/local-ui';
import { ViewType } from '../../../../models/enums/view-type';
import { Projects } from '../../../shared/projects/list/projects';

@Component({
  selector: 'app-company-projects',
  templateUrl: './company-projects.component.html',
  styleUrls: ['./company-projects.component.scss']
})

export class CompanyProjectsComponent extends Projects {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
