import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { BonusesComponent } from 'src/components/shared/bonuses/list/bonuses';

@Component({
  selector: 'app-bonuses-list',
  templateUrl: './bonuses-list.component.html',
  styleUrls: ['./bonuses-list.component.scss']
})
export class SalaryBonusesListComponent extends BonusesComponent {

  constructor(route: ActivatedRoute,
              router: Router,
              logger: NGXLogger) {
    super(route, router, logger);
  }

  getState(state: Object) {
    delete state['salary'];
    return state;
  }

}
