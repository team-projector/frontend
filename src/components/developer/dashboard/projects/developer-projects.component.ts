import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import { MOCKS_DELAY } from '../../../../consts';
import { environment } from '../../../../environments/environment';
import { DurationFormat } from '../../../../models/enums/duration-format';
import { MilestoneProblem } from '../../../../models/enums/milestone';
import { IssuesFilter, IssuesSummary } from '../../../../models/issue';
import { Project } from '../../../../models/project';
import { Me } from '../../../../models/user';
import { getMock } from '../../../../utils/mocks';
import { DeveloperProjectsSummaryGQL } from './developer-projects.graphql';

@Component({
  selector: 'app-developer-projects',
  templateUrl: './developer-projects.component.html',
  styleUrls: ['./developer-projects.component.scss']
})
export class DeveloperProjectsComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  milestoneProblem = MilestoneProblem;

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
  me: Me;

  @Output()
  selected = new EventEmitter<Project>();

  constructor(private summaryGQL: DeveloperProjectsSummaryGQL) {
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    const filter = new IssuesFilter({user: this.me.id});
    (environment.mocks
        ? of(getMock(IssuesSummary)).pipe(delay(MOCKS_DELAY))
        : this.summaryGQL.fetch(serialize(filter) as R)
          .pipe(map(({data: {issues}}) => deserialize(issues, IssuesSummary)))
    ).subscribe(summary => this.summary = summary);
  }

}
