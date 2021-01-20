import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-earn',
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.scss']
})
export class EarnComponent {

  @Input()
  payroll: number;

  @Input()
  paid: number;

}
