import {Component, OnInit} from '@angular/core';
import {UI} from 'junte-ui';
import {ActivatedRoute, Router} from '@angular/router';
import {format} from 'date-fns';
import {distinctUntilChanged} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Team} from 'src/models/team';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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

  filter = new FormControl();

  form: FormGroup = this.formBuilder.group({
    filter: this.filter
  });

  set team(team: Team) {
    this.team$.next(team);
  }

  get team() {
    return this.team$.getValue();
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.filter.valueChanges.pipe(distinctUntilChanged())
      .subscribe(filter => {
        // TODO: more optimal
        const state = {
          user: !!filter.user ? filter.user.id : null,
          due_date: !!filter.dueDate ? format(filter.dueDate, 'MM-DD-YYYY') : null
        };
        this.router.navigate([state, 'issues'],
          {relativeTo: this.route});
      });

    this.route.data.subscribe(({team, dueDate, user}) => {
      this.team = team;
      this.form.patchValue({
        filter: {
          user: user,
          dueDate: dueDate
        }
      }, {emitEvent: false});
    });
  }
}
