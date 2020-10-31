import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { BackendError } from 'src/types/gql-errors';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';
import { Project } from 'src/models/project';
import { User } from 'src/models/user';
import { getMock } from 'src/utils/mocks';
import { Team } from 'src/models/team';
import { ProjectsSummaryGQL } from './projects-summary.graphql';

@Component({
  selector: 'app-projects-summary',
  templateUrl: './projects-summary.component.html',
  styleUrls: ['./projects-summary.component.scss']
})
export class ProjectsSummaryComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  errors: BackendError[] = [];

  project: Project;
  colors = [
    UI.color.purple,
    UI.color.red,
    UI.color.green,
    UI.color.yellow,
    UI.color.teal,
    UI.color.orange,
    UI.color.purpleLight
  ];

  summary: IssuesSummary;

  @Input()
  user: User;

  @Input()
  team: Team;

  @Output()
  selected = new EventEmitter<string>();

  constructor(private summaryGQL: ProjectsSummaryGQL) {
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    const filter = new IssuesFilter({user: this.user?.id, team: this.team?.id});
    (environment.mocks
        ? of(getMock(IssuesSummary)).pipe(delay(MOCKS_DELAY))
        : this.summaryGQL.fetch(serialize(filter) as R)
          .pipe(map(({data: {issues}}) => deserialize(issues, IssuesSummary)))
    ).subscribe(summary => this.summary = summary, err => this.errors = err);
  }

}
