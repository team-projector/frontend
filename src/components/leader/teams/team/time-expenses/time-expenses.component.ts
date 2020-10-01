import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeExpensesComponent } from 'src/components/shared/time-expenses/list/time-expenses';

@Component({
  selector: 'app-team-time-expenses-component',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})

export class TeamTimeExpensesComponent extends TimeExpensesComponent {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

}
