import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';

@Component({
  selector: 'app-earn',
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.scss']
})
export class EarnComponent {

  ui = UI;

  @Input()
  payroll: number;

  @Input()
  paid: number;

}
