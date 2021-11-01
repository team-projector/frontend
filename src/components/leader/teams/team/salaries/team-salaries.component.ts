import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';
import { Salaries } from 'src/components/shared/salaries/list/salaries';

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
              router: Router) {
    super(route, router);
  }

}
