import { Component, Input } from '@angular/core';
import { Salary } from 'src/models/graphql/salary';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-salary-detail-widget',
  templateUrl: './salary-detail-widget.component.html',
  styleUrls: ['./salary-detail-widget.component.scss']
})

export class SalaryDetailWidgetComponent {

  ui = UI;

  @Input() salary: Salary;

  constructor() {
  }
}
