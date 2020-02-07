import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from 'junte-ui';
import { TimeExpensesListComponent } from 'src/components/issues/time-expenses/time-expenses-list';
import { TimeExpensesState } from 'src/components/issues/time-expenses/time-expenses.component';
import { TimeExpenseType } from 'src/models/enums/time-expenses';
import { ViewType } from 'src/models/enums/view-type';
import { Salary } from 'src/models/salary';

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.scss']
})

export class SalaryDetailComponent extends TimeExpensesListComponent {
  ui = UI;
  salary: Salary;
  viewType = ViewType;

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
    route.data.subscribe(({salary}) => this.salary = salary);
  }

  getState(state: TimeExpensesState) {
    delete state['salary'];
    delete state['user'];
    state.type = TimeExpenseType.all;
    return state;
  }
}
