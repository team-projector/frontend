import { Component, EventEmitter, Output } from '@angular/core';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-team-merge-requests-list',
  templateUrl: './merge-requests.component.html',
  styleUrls: ['./merge-requests.component.scss']
})

export class TeamMergeRequestsListComponent {

  ui = UI;
  @Output() reloaded = new EventEmitter();
}
