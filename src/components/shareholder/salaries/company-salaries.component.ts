import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ViewType } from '../../../models/enums/view-type';
import { Salaries } from '../../shared/salaries/list/salaries';

@Component({
  selector: 'app-company-salaries',
  templateUrl: './company-salaries.component.html',
  styleUrls: ['./company-salaries.component.scss']
})

export class CompanySalariesComponent extends Salaries {

  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
