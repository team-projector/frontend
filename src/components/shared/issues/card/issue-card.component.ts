import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { IssueState } from 'src/models/enums/issue';
import { Issue } from 'src/models/issue';
import { LocalUI } from '../../../../enums/local-ui';
import { ViewType } from '../../../../models/enums/view-type';

@Component({
  selector: 'app-issue',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
export class IssueCardComponent {

  ui = UI;
  localUi = LocalUI;
  issueState = IssueState;
  view: ViewType = ViewType.developer;

  @Input()
  issue: Issue;

}
