import { Component, Input } from '@angular/core';
import { UserMetrics } from 'src/models/user-metrics';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-salary-metrics',
  templateUrl: './salary-metrics.component.html',
  styleUrls: ['./salary-metrics.component.scss']
})

export class SalaryMetricsComponent {

  ui = UI;

  @Input() metrics: UserMetrics;

}
