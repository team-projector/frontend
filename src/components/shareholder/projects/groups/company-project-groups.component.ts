import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';
import { Projects } from '../../../shared/projects/list/projects';

@Component({
  selector: 'app-company-project-groups',
  templateUrl: './company-project-groups.component.html',
  styleUrls: ['./company-project-groups.component.scss']
})

export class CompanyProjectGroupsComponent extends Projects {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
