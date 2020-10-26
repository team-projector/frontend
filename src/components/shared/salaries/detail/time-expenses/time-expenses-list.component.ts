import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeExpensesComponent } from 'src/components/shared/time-expenses/list/time-expenses';
import { TimeExpenseType } from 'src/models/enums/time-expenses';
import { ViewType } from 'src/models/enums/view-type';

@Component({
  selector: 'app-salary-time-expenses-list',
  templateUrl: './time-expenses-list.component.html',
  styleUrls: ['./time-expenses-list.component.scss']
})
export class SalaryTimeExpensesListComponent extends TimeExpensesComponent {

  timeExpenseType = TimeExpenseType;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

}
