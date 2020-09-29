import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { StandardLabel } from 'src/models/enums/standard-label';
import { LocalUI } from '../../../../enums/local-ui';
import { MergeRequestState } from '../../../../models/enums/merge-requests';
import { MergeRequest } from '../../../../models/merge-request';

@Component({
  selector: 'app-merge-request',
  templateUrl: './merge-request-card.component.html',
  styleUrls: ['./merge-request-card.component.scss']
})
export class MergeRequestCardComponent {

  ui = UI;
  localUi = LocalUI;
  mergeRequestState = MergeRequestState;
  standardLabel = StandardLabel;

  @Input()
  mergeRequest: MergeRequest;

}