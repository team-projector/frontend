import { Component, Input } from '@angular/core';
import { UI } from '@esanum/ui';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent {

  ui = UI;

  @Input()
  payroll: number;

  @Input()
  budget: number;

  @Input()
  profit: number;

}
