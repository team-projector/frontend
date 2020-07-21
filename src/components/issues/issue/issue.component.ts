import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { IssueState } from 'src/models/enums/issue';
import { StandardLabel } from 'src/models/enums/standard-label';
import { Issue } from 'src/models/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent {

  ui = UI;
  issueState = IssueState;
  standardLabel = StandardLabel;

  @Input()
  issue: Issue;

}
