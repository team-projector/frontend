import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeExpensesComponent } from 'src/components/shared/time-expenses/list/time-expenses';

@Component({
  selector: 'app-developer-time-expenses',
  templateUrl: './developer-time-expenses.component.html',
  styleUrls: ['./developer-time-expenses.component.scss']
})
export class DeveloperTimeExpensesComponent extends TimeExpensesComponent {

  constructor(route: ActivatedRoute,
              router: Router) {
    super(route, router);
  }

}
