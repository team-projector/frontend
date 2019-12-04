import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeExpensesListComponent } from 'src/components/issues/time-expenses/time-expenses-list';

@Component({
  selector: 'app-developer-time-expenses-list',
  templateUrl: './time-expenses-list.component.html',
  styleUrls: ['./time-expenses-list.component.scss']
})
export class DeveloperTimeExpensesListComponent extends TimeExpensesListComponent {
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
