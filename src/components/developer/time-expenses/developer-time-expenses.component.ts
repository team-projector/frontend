import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeExpensesListComponent } from 'src/components/issues/time-expenses/time-expenses-list';

@Component({
  selector: 'app-developer-time-expenses',
  templateUrl: './developer-time-expenses.component.html',
  styleUrls: ['./developer-time-expenses.component.scss']
})
export class DeveloperTimeExpensesComponent extends TimeExpensesListComponent {

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
