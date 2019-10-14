import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from 'junte-ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Milestone, Ticket } from 'src/models/milestone';
import { Team } from 'src/models/team';
import { equals } from 'src/utils/equals';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  private team$ = new BehaviorSubject<Team>(null);
  ui = UI;
  milestone: Milestone;
  filter = new FormControl();

  form: FormGroup = this.formBuilder.group({
    filter: this.filter
  });

  @Input()
  set team(team: Team) {
    if (!equals(this.team, team)) {
      this.team$.next(team);
    }
  }

  get team() {
    return this.team$.getValue();
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    combineLatest([this.form.valueChanges, this.team$]).pipe(distinctUntilChanged())
      .subscribe(([{filter: {ticket}}, team]) => {
        const state: { ticket?, team? } = {};
        if (!!ticket) {
          state.ticket = ticket.id;
        }
        if (!!team) {
          state.team = team.id;
        }
        this.router.navigate([state], {relativeTo: this.route});
      });

    this.route.data.pipe(
      map(({milestone, team, ticket}: { milestone: Milestone, team: Team, ticket: Ticket }) =>
        ({milestone: milestone, team: team, ticket: ticket})),
      distinctUntilChanged()
    ).subscribe(({milestone, team, ticket}) => {
      if (!!milestone) {
        this.milestone = milestone;
      }
      if (!!team) {
        this.team = team;
      }
      if (!!ticket) {
        this.form.patchValue({filter: {ticket: ticket}}, {emitEvent: false});
      }
    });
  }

}
