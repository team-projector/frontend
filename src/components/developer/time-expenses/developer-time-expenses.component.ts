import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { TimeExpensesComponent } from 'src/components/shared/time-expenses/list/time-expenses';
import { LocalUI } from '../../../enums/local-ui';
import { ViewType } from '../../../models/enums/view-type';

@Component({
  selector: 'app-developer-time-expenses',
  templateUrl: './developer-time-expenses.component.html',
  styleUrls: ['./developer-time-expenses.component.scss']
})
export class DeveloperTimeExpensesComponent extends TimeExpensesComponent {

  ui = UI;
  localUi = LocalUI;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

}
