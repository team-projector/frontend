import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {R} from 'apollo-angular/types';
import {isEqual, UI} from 'junte-ui';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {deserialize, serialize} from 'serialize-ts/dist';
import {MilestoneIssuesSummaryGQL} from 'src/components/manager/milestones/milestone/milestone.graphql';
import {IssuesFilter, IssuesSummary} from 'src/models/issue';
import {Milestone} from 'src/models/milestone';
import {Team} from 'src/models/team';
import {Ticket} from 'src/models/ticket';
import {DurationFormat} from 'src/pipes/date';
import {field, model} from '@junte/mocker-library';

@model()
export class MilestoneState {

  @field()
  ticket?: string;

  @field()
  team?: string;

  constructor(defs: MilestoneState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;

  private _filter: IssuesFilter;

  ticket = new FormControl(null);
  team = new FormControl(null);
  summary: IssuesSummary;
  milestone: Milestone;
  colors = [
    UI.colors.purple,
    UI.colors.red,
    UI.colors.green,
    UI.colors.yellow,
    UI.colors.teal,
    UI.colors.orange,
    UI.colors.purpleLight
  ];

  form: FormGroup = this.formBuilder.group({
    ticket: this.ticket,
    team: this.team
  });

  set filter(filter: IssuesFilter) {
    this._filter = filter;
    this.loadSummary();
  }

  get filter() {
    return this._filter;
  }

  constructor(private milestoneIssuesSummaryGQL: MilestoneIssuesSummaryGQL,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({ticket, team}) => {
        this.filter = new IssuesFilter({
          milestone: !!this.milestone ? this.milestone.id : undefined,
          ticket: !!ticket ? ticket.id : undefined
        });
        const state = new MilestoneState({
          ticket: !!ticket ? ticket.id : undefined,
          team: !!team ? team.id : undefined
        });
        this.router.navigate([serialize(state)],
          {relativeTo: this.route}).then(() => null);
      });

    this.route.data.subscribe(({milestone, team, ticket}) => {
      this.milestone = milestone;
      this.form.patchValue(
        {
          ticket: ticket || null,
          team: team || null
        });
    });
  }

  loadSummary() {
    this.milestoneIssuesSummaryGQL.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {summary}}) => deserialize(summary, IssuesSummary)))
      .subscribe(summary => this.summary = summary);
  }

}
