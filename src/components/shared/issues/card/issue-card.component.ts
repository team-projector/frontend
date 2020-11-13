import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { DFNS_LOCALE } from 'src/consts';
import { LocalUI } from 'src/enums/local-ui';
import { IssueState } from 'src/models/enums/issue';
import { ViewType } from 'src/models/enums/view-type';
import { Issue } from 'src/models/issue';

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
