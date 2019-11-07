import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  milestone: Milestone;
  team: Team;
  ticket: Ticket;
  type: IssuesType;
  problems: boolean;

  @Output() reloaded = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({milestone, team, ticket, type}) => {
      [this.milestone, this.team, this.ticket, this.type] = [milestone, team, ticket, type || IssuesType.all]
    });
  }

  filtered(state: { type? }) {
    this.router.navigate([state], {relativeTo: this.route})
      .then(() => null);
  }

}
