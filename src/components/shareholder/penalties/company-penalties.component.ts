import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { ViewType } from '../../../models/enums/view-type';
import { PenaltiesComponent } from '../../shared/penalties/penalties';

@Component({
  selector: 'app-company-penalties',
  templateUrl: './company-penalties.component.html',
  styleUrls: ['./company-penalties.component.scss']
})
export class CompanyPenaltiesComponent extends PenaltiesComponent {

  ui = UI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
