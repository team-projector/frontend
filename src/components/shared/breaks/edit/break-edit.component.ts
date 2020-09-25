import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { BreakReasons } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { PagingTeamMembers, Team, TeamMember } from 'src/models/team';
import { BreakUpdate, WorkBreak } from 'src/models/work-break';
import { getMock } from 'src/utils/mocks';
import { User } from '../../../../models/user';
import { CreateBreakGQL, GetTeamMembersGQL, UpdateWorkBreakGQL } from './break-edit.graphql';

@Component({
  selector: 'app-break-edit',
  templateUrl: './break-edit.component.html',
  styleUrls: ['./break-edit.component.scss']
})
export class BreakEditComponent {

  ui = UI;
  reasons = BreakReasons;
  viewType = ViewType;

  private _break: WorkBreak;
  private _team: Team;

  progress = {saving: false};
  members: TeamMember[] = [];

  form = this.fb.group({
    id: [null],
    user: [null],
    comment: [null, Validators.required],
    reason: [null, Validators.required],
    fromDate: [null, Validators.required],
    toDate: [null, Validators.required]
  });

  teamControl = this.fb.control(null);
  teamForm = this.fb.group({team: this.teamControl});

  @Input()
  view = ViewType.default;

  @Input()
  set break(workBreak: WorkBreak) {
    this._break = workBreak;
    this.form.patchValue({
      id: workBreak.id,
      user: workBreak.user?.id,
      comment: workBreak.comment,
      reason: workBreak.reason,
      fromDate: workBreak.fromDate,
      toDate: workBreak.toDate
    });
  }

  get break() {
    return this._break;
  }

  @Input()
  set user(user: User) {
    this.form.patchValue({
      user: user.id
    });
  }

  @Input()
  set team(team: Team) {
    this._team = team;
    this.loadMembers();
  }

  @Output()
  saved = new EventEmitter<BreakUpdate>();

  @Output()
  canceled = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private createBreakGQL: CreateBreakGQL,
              private updateWorkBreakGQL: UpdateWorkBreakGQL,
              private getTeamMembersGQL: GetTeamMembersGQL) {
  }

  loadMembers() {
    (environment.mocks
        ? of(getMock(PagingTeamMembers)).pipe(delay(MOCKS_DELAY))
        : this.getTeamMembersGQL.fetch(this.teamForm.getRawValue() as R)
          .pipe(map(({data: {team: {members}}}) => deserialize(members, PagingTeamMembers)))
    ).subscribe(teams => this.members = teams.results);
  }

  save() {
    const request = new BreakUpdate(this.form.getRawValue());
    this.progress.saving = true;
    const action = (!!this.break ? this.updateWorkBreakGQL : this.createBreakGQL)
      .mutate(serialize(request) as R)
      .pipe(map(({data: {response: {workBreak}}}) => deserialize(workBreak, WorkBreak)));

    (environment.mocks ? of(getMock(WorkBreak)) : action)
      .pipe(finalize(() => this.progress.saving = false))
      .subscribe(() => this.saved.emit());
  }

}
