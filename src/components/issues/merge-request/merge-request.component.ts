import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { StandardLabel } from 'src/models/enums/standard-label';
import { MergeRequestState } from '../../../models/enums/merge-requests';
import { MergeRequest } from '../../../models/merge-request';

@Component({
  selector: 'app-merge-request',
  templateUrl: './merge-request.component.html',
  styleUrls: ['./merge-request.component.scss']
})
export class MergeRequestComponent {

  ui = UI;
  mergeRequestState = MergeRequestState;
  standardLabel = StandardLabel;

  @Input()
  mergeRequest: MergeRequest;

}
