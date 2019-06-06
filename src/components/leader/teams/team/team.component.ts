import { Component, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Team } from 'src/models/team';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

class Params {
  constructor(defs: any = null) {
    for (const def in defs) {
      if (!!defs[def]) {
        this[def] = defs[def];
      }
    }
  }
}

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  ui = UI;

  private team$ = new BehaviorSubject<Team>(null);

  dueDate = new FormControl(new Date());
  user = new FormControl(null);

  filterUser: FormGroup = this.fb.group({
    filter: new FormControl({
      dueDate: this.dueDate,
      user: this.user
    })
  });

  set team(team: Team) {
    this.team$.next(team);
  }

  get team() {
    return this.team$.getValue();
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.filterUser.valueChanges.pipe(distinctUntilChanged())
      .subscribe(f => {
        const params = new Params({
          user: !!f.filter.user ? f.filter.user.id : null,
          due_date: !!f.filter.dueDate ? format(f.filter.dueDate, 'MM-DD-YYYY') : null
        });
        this.router.navigate([params, 'issues'],
          {relativeTo: this.route});
      });

    this.route.data.subscribe(({team, dueDate, user}) => {
      if (!!team) {
        this.team = team;
      }
      this.filterUser.patchValue({filter: {user: user, dueDate: dueDate}}, {emitEvent: false});
    });
  }
}
