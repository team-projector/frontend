import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { isEqual, UI } from '@junte/ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { BackendError } from 'src/types/gql-errors';
import { PagingTeams, Team } from 'src/models/team';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { LocalUI } from '../../../enums/local-ui';
import { AllTeamsGQL } from './teams.graphql';
import { TeamsState } from './teams.types';

const PAGE_SIZE = 14;
const DEFAULT_PAGE = 1;

@Component({
  selector: 'app-leader-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  ui = UI;
  localUi = LocalUI;
  durationFormat = DurationFormat;

  private _state: TeamsState;
  teams: Team[] = [];
  errors: BackendError[] = [];
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
    return Math.ceil(this.count / PAGE_SIZE);
  }

  constructor(private allTeamsGQL: AllTeamsGQL,
              private fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageControl.valueChanges.subscribe(page =>
      this.router.navigate([page !== DEFAULT_PAGE ? {page} : {}], {relativeTo: this.route}));

    this.route.params.subscribe(({page}) => {
      const p = +page || DEFAULT_PAGE;
      this.pageControl.patchValue(p, {emitEvent: false});
      this.state = new TeamsState({
        first: PAGE_SIZE,
        offset: (p - 1) * PAGE_SIZE
      });
    });
  }

  private load() {
    this.loading = true;
    (environment.mocks
      ? of(getMock(PagingTeams)).pipe(delay(MOCKS_DELAY))
      : this.allTeamsGQL.fetch(serialize(this.state) as R).pipe(
        catchGQLErrors(),
        map(({data: {teams}}) => deserialize(teams, PagingTeams))))
      .pipe(delay(UI_DELAY), finalize(() => this.loading = false))
      .subscribe(teams => {
        this.teams = teams.results;
        this.count = teams.count;
      }, err => this.errors = err);
  }

}
