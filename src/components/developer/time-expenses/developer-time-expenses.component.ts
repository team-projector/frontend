import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { TimeExpensesComponent } from 'src/components/shared/time-expenses/list/time-expenses';
import { LocalUI } from 'src/enums/local-ui';
import { ViewType } from 'src/models/enums/view-type';

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
