import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeExpensesListComponent } from 'src/components/issues/time-expenses/time-expenses-list';
import { TimeExpenseType } from 'src/models/enums/time-expenses';
import { ViewType } from 'src/models/enums/view-type';

@Component({
  selector: 'app-salary-time-expenses-list',
  templateUrl: './time-expenses-list.component.html',
  styleUrls: ['./time-expenses-list.component.scss']
})
export class SalaryTimeExpensesListComponent extends TimeExpensesListComponent {

  timeExpenseType = TimeExpenseType;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

  getState(state: Object) {
    delete state['user'];
    delete state['salary'];
    delete state['type'];
    return state;
  }
}
