import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { isEqual, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { PagingTeams, Team } from 'src/models/team';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { AllTeamsGQL } from './teams.graphql';

const DEFAULT_FIRST = 14;
const DEFAULT_PAGE = 1;

@model()
export class TeamsState {

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: TeamsState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-leader-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  private _state: TeamsState;
  ui = UI;
  durationFormat = DurationFormat;
  teams: Team[] = [];
  loading: boolean;
  count: number;

  pageControl = this.fb.control(DEFAULT_PAGE);
  form = this.fb.group({page: this.pageControl});

  set state(state: TeamsState) {
    this._state = state;
    this.load();
  }

  get state() {
    return this._state;
  }

  get pagesCount() {
    return Math.ceil(this.count / DEFAULT_FIRST);
  }

  constructor(private allTeamsGQL: AllTeamsGQL,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageControl.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(page => this.router.navigate([page !== DEFAULT_PAGE ? {page} : {}], {relativeTo: this.route}));
    this.route.params.pipe(
      distinctUntilChanged((val1, val2) => isEqual(val1, val2))
    ).subscribe(({page}) => {
      const p = +page || DEFAULT_PAGE;
      this.pageControl.patchValue(p);
      this.state = new TeamsState({
        first: DEFAULT_FIRST,
        offset: (p - 1) * DEFAULT_FIRST
      });
    });
  }

  private load() {
    console.log(this.state);
    this.loading = true;
    (environment.mocks
      ? of(getMock(PagingTeams)).pipe(delay(MOCKS_DELAY))
      : this.allTeamsGQL.fetch(serialize(this.state) as R).pipe(
        catchGQLErrors(),
        map(({data: {teams}}) => deserialize(teams, PagingTeams))))
      .pipe(finalize(() => this.loading = false))
      .subscribe(teams => {
        this.teams = teams.results;
        this.count = teams.count;
      });
  }
}
