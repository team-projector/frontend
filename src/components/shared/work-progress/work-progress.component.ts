import { Component, Input } from '@angular/core';
import { UI } from '@esanum/ui';
import { IssueProblem } from 'src/models/enums/issue';

@Component({
  selector: 'app-work-progress',
  templateUrl: './work-progress.component.html',
  styleUrls: ['./work-progress.component.scss']
})
export class WorkProgressComponent {

  ui = UI;
  issueProblem = IssueProblem;

  @Input()
  spent: number;

  @Input()
  estimate: number;

  @Input()
  efficiency: number;

  @Input()
  problems: IssueProblem[] = [];

}
