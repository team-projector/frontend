import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { MeManager } from 'src/managers/me.manager';
import { Break, BreakUpdate } from 'src/models/break';
import { BreakReasons } from 'src/models/enums/break';
import { ViewType } from 'src/models/enums/view-type';
import { PagingTeamMembers, TeamMember } from 'src/models/team';
import { getMock } from 'src/utils/mocks';
import { CreateBreakGQL, GetTeamMembersGQL, UpdateWorkBreakGQL } from './break-create.graphql';

@Component({
  selector: 'app-break-edit',
  templateUrl: './break-edit.component.html',
  styleUrls: ['./break-edit.component.scss']
})
export class BreakEditComponent {

  private _break: Break;
  ui = UI;
  saving = false;
  reasons = BreakReasons;
  viewType = ViewType;
  members: TeamMember[] = [];

  form = this.fb.group({
    id: [null],
    user: [this.me.user.id],
    team: [this.team],
    comment: [null, Validators.required],
    reason: [null, Validators.required],
    fromDate: [new Date(), Validators.required],
    toDate: [new Date(), Validators.required]
  });

  teamControl = this.fb.control(null);
  teamForm = this.fb.group({team: this.teamControl});

  @Input() view = ViewType.default;

  @Input() set break(workBreak: Break) {
    if (!!workBreak) {
      this._break = workBreak;
      this.form.patchValue({...this._break, user: workBreak.user.id});
    }
  }

  @Input() set team(team: string) {
    if (!!team) {
      this.teamControl.patchValue(team);
      this.loadMembers();
    }
  }

  get break() {
    return this._break;
  }

  @Output() saved = new EventEmitter<BreakUpdate>();
  @Output() canceled = new EventEmitter<any>();

  constructor(private me: MeManager,
              private fb: FormBuilder,
              private createBreakGQL: CreateBreakGQL,
              private updateWorkBreakGQL: UpdateWorkBreakGQL,
              private getTeamMembersGQL: GetTeamMembersGQL) {
  }

  loadMembers() {
    (environment.mocks
        ? of(getMock(PagingTeamMembers, {user: !!this.break ? this.break.user : this.me.user})).pipe(delay(MOCKS_DELAY))
        : this.getTeamMembersGQL.fetch(this.teamForm.getRawValue() as R)
          .pipe(map(({data: {team: {members}}}) => {
            return deserialize(members, PagingTeamMembers);
          }))
    ).subscribe(teams => this.members = teams.results);
  }

  save() {
    this.saving = true;
    const mutation = !!this.break ? this.updateWorkBreakGQL : this.createBreakGQL;
    (environment.mocks ? of(null)
      : mutation.mutate(serialize(new BreakUpdate(this.form.getRawValue())) as R)
        .pipe(finalize(() => this.saving = false)))
      .subscribe(() => this.saved.emit());
  }

}
