import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';
import { BonusesComponent } from '../../shared/bonuses/list/bonuses';

@Component({
  selector: 'app-company-bonuses',
  templateUrl: './company-bonuses.component.html',
  styleUrls: ['./company-bonuses.component.scss']
})
export class CompanyBonusesComponent extends BonusesComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

}
