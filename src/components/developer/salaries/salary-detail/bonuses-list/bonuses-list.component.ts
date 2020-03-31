import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BonusesListComponent } from 'src/components/bonuses/bonuses-list.component';

@Component({
  selector: 'app-bonuses-list',
  templateUrl: './bonuses-list.component.html',
  styleUrls: ['./bonuses-list.component.scss']
})
export class SalaryBonusesListComponent extends BonusesListComponent {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    delete state['project'];
    return state;
  }

}
