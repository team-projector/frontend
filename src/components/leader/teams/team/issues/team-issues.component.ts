import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { UI } from '@junte/ui';
import { combineLatest, of } from 'rxjs';
import { delay, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { METRIC_TYPE } from 'src/components/metrics-type/consts';
import { DATE_FORMAT, MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { DurationFormat } from 'src/models/enums/duration-format';
import { MetricType } from 'src/models/enums/metrics';
import { MilestoneProblem } from 'src/models/enums/milestone';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';
import { MergeRequestSummary } from 'src/models/merge-request';
import { Project } from 'src/models/project';
import { SpentTimesSummary } from 'src/models/spent-time';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';
import { DateSerializer } from 'src/serializers/date';
import { environment } from 'src/environments/environment';
import { getMock } from 'src/utils/mocks';
import { FirstSummaryGQL, SecondSummaryGQL } from './team-issues.graphql';

@model()
export class TeamState {

  @field()
  user?: string;

  @field()
  project?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: Date;

  constructor(defs: TeamState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@Component({
  selector: 'app-leader-team-issues',
  templateUrl: './team-issues.component.html',
  styleUrls: ['./team-issues.component.scss']
})
export class TeamIssuesComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  milestoneProblem = MilestoneProblem;
  colors = [
    UI.color.purple,
    UI.color.red,
    UI.color.green,
    UI.color.yellow,
    UI.color.teal,
    UI.color.orange,
    UI.color.purpleLight
  ];

  project: Project;

  team: Team;
  filter = new FormControl();
  projectControl = new FormControl();

  summary: {
    first?: IssuesSummary, second?: {
      issues: IssuesSummary,
      mergeRequests: MergeRequestSummary
      spentTimes: SpentTimesSummary
    }
  } = {};

  filter2 = new IssuesFilter();
  metric = new FormControl(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form: FormGroup = this.formBuilder.group({
    filter: this.filter,
    project: this.projectControl,
    metric: this.metric
  });

  constructor(private firstSummaryGQL: FirstSummaryGQL,
              private secondSummaryGQL: SecondSummaryGQL,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(({filter: {user, dueDate}, project}) => {
        const state = new TeamState({
          user: !!user ? user.id : undefined,
          project: project || undefined,
          dueDate: dueDate || undefined
        });
        const path = [];
        this.route.snapshot.children.forEach(child =>
          child.url.forEach(segment => path.push(segment.path)));
        this.router.navigate([serialize(state), ...path],
          {relativeTo: this.route}).then(() => null);
      });

    const first = this.route.data.pipe(
      map(({team, user, dueDate}: { team: Team, user: User, dueDate: Date }) => ({team, user, dueDate})),
      distinctUntilChanged(),
      tap(({team, user, dueDate}) => {
        this.team = team;
        this.form.patchValue({
          filter: {
            user: user,
            dueDate: dueDate
          }
        }, {emitEvent: false});
        this.filter2.team = team.id;
        this.filter2.user = !!user ? user.id : null;
        this.filter2.dueDate = dueDate;
      }));

    const second = this.route.data.pipe(
      map(({project}: { project: Project }) => ({project: project})),
      distinctUntilChanged(),
      tap(({project}) => {
        this.project = project;
        this.projectControl.setValue(project?.id || null, {emitEvent: false});
        this.filter2.project = !!project ? project.id : null;
      }));

    first.subscribe(() => this.loadFirstSummary());

    combineLatest([first, second])
      .pipe(distinctUntilChanged())
      .subscribe(() => this.loadSecondSummary());
  }

  loadFirstSummary() {
    (environment.mocks
      ? of(getMock(IssuesSummary)).pipe(delay(MOCKS_DELAY))
      : this.firstSummaryGQL.fetch(serialize(this.filter2) as R)
        .pipe(map(({data: {summary}}) => deserialize(summary, IssuesSummary))))
      .subscribe(summary => this.summary.first = summary);
  }

  loadSecondSummary() {
    (environment.mocks
      ? of({
        issues: getMock(IssuesSummary),
        mergeRequests: getMock(MergeRequestSummary),
        spentTimes: getMock(SpentTimesSummary)
      }).pipe(delay(MOCKS_DELAY))
      : this.secondSummaryGQL.fetch(serialize(this.filter2) as R)
      .pipe(map(({data: {issues, mergeRequests, spentTimes}}) => ({
        issues: deserialize(issues, IssuesSummary),
        mergeRequests: deserialize(mergeRequests, MergeRequestSummary),
        spentTimes: deserialize(spentTimes, SpentTimesSummary)
      })))
    ).subscribe(summary => this.summary.second = summary);
  }

  onActivate(component) {
    if (!!component.reloaded) {
      component.reloaded.subscribe(() => {
        this.loadFirstSummary();
        this.loadSecondSummary();
      });
    }
  }
}
