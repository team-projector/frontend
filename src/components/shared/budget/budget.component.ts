import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

  ui = UI;

  @Input()
  budgetSpent: number;

  @Input()
  budget: number;

  @Input()
  budgetRemains: number;

}
