import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';
import { Project } from 'src/models/project';
import { Me } from 'src/models/user';
import { getMock } from 'src/utils/mocks';
import { DeveloperProjectsSummaryGQL } from './developer-projects.graphql';

@Component({
  selector: 'app-developer-projects',
  templateUrl: './developer-projects.component.html',
  styleUrls: ['./developer-projects.component.scss']
})
export class DeveloperProjectsComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;

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
  selected = new EventEmitter<string>();

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
