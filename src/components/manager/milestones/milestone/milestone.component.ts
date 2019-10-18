import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { UI } from 'junte-ui';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MilestoneIssuesSummaryGQL } from 'src/components/manager/milestones/milestone/milestone.graphql';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';
import { Milestone } from 'src/models/milestone';
import { Team } from 'src/models/team';
import { Ticket } from 'src/models/ticket';
import { DurationFormat } from 'src/pipes/date';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  tickets = new FormControl(null);
  team = new FormControl(null);
  filter = new IssuesFilter();
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
    tickets: this.tickets,
    team: this.team
  });

  constructor(private milestoneIssuesSummaryGQL: MilestoneIssuesSummaryGQL,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    combineLatest([this.form.valueChanges])
      .pipe(distinctUntilChanged())
      .subscribe(([{tickets, team}]) => {
        const state: { ticket?, team? } = {};
        if (!!tickets) {
          state.ticket = tickets.id;
        }
        if (!!team) {
          state.team = team.id;
        }
        this.router.navigate([state], {relativeTo: this.route});
      });

    this.route.data.pipe(map(({milestone, team, ticket}: { milestone: Milestone, team: Team, ticket: Ticket }) =>
        ({milestone: milestone, team: team, ticket: ticket})),
      distinctUntilChanged()
    ).subscribe(({milestone, team, ticket}) => {
      this.filter = new IssuesFilter();

      if (!!milestone) {
        this.milestone = milestone;
        this.filter.milestone = milestone.id;
      }
      if (!!team) {
        this.team.patchValue(team, {emitEvent: false});
      }
      if (!!ticket) {
        this.tickets.patchValue(ticket, {emitEvent: false});
        this.filter.ticket = ticket.id;
      }

      this.loadSummary();
    });
  }

  loadSummary() {
    this.milestoneIssuesSummaryGQL.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {summary}}) => deserialize(summary, IssuesSummary)))
      .subscribe(summary => this.summary = summary);
  }

}
