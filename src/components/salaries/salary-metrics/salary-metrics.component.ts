import { Component, Input } from '@angular/core';
import { UI } from 'junte-ui';
import { UserMetrics } from '../../../models/user';

@Component({
  selector: 'app-salary-metrics',
  templateUrl: './salary-metrics.component.html',
  styleUrls: ['./salary-metrics.component.scss']
})

export class SalaryMetricsComponent {

  ui = UI;

  @Input() metrics: UserMetrics;

}
