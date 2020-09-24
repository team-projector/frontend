import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { IssueState } from 'src/models/enums/issue';
import { Issue } from 'src/models/issue';
import { LocalUI } from '../../../../enums/local-ui';
import { StandardLabel } from '../../../../models/enums/standard-label';

@Component({
  selector: 'app-issue',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent {

  ui = UI;
  localUi = LocalUI;
  issueState = IssueState;
  standardLabel = StandardLabel;

  @Input()
  issue: Issue;

}
