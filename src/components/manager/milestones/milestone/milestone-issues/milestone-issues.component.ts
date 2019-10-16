import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewType } from 'src/components/issues/issues/issues.component';
import { IssuesType } from 'src/models/issue';
import { Milestone } from 'src/models/milestone';
import { Team } from 'src/models/team';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-milestone-issues',
  templateUrl: './milestone-issues.component.html',
  styleUrls: ['./milestone-issues.component.scss']
})
export class MilestoneIssuesComponent implements OnInit {

  viewType = ViewType;
  milestone: Milestone;
  team: Team;
  ticket: Ticket;
  type: IssuesType;
  problems: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({milestone, team, ticket, type}) =>
      [this.milestone, this.team, this.ticket, this.type] = [milestone, team, ticket, type]);
  }

  filtered(state: { type? }) {
    this.router.navigate([state], {relativeTo: this.route})
      .then(() => null);
  }

}
