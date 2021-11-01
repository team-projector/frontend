import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';
import { Salaries } from '../../shared/salaries/list/salaries';

@Component({
  selector: 'app-company-salaries',
  templateUrl: './company-salaries.component.html',
  styleUrls: ['./company-salaries.component.scss']
})

export class CompanySalariesComponent extends Salaries {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

}
