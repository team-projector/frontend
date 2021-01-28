import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getMock } from '@junte/mocker';
import { deserialize, serialize } from '@junte/serialize-ts';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { EditProfileGQL, GetMeGQL } from 'src/components/layout/edit-profile/edit-profile.graphql';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { Me, MeUpdate } from 'src/models/user';
import { BackendError } from 'src/types/gql-errors';
import { catchGQLErrors } from 'src/utils/gql-errors';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  ui = UI;

  progress = {
    loading: false,
    saving: false
  };
  errors: BackendError[] = [];

  form = this.fb.group({
    name: [null, Validators.required],
    email: null,
    glToken: null
  });

  @ViewChild('content', {read: ElementRef})
  backdrop: ElementRef<HTMLElement>;

  @Output()
  closed = new EventEmitter<any>();

  @Output()
  saved = new EventEmitter<Me>();

  constructor(private getMeGQL: GetMeGQL,
              private editProfileGQL: EditProfileGQL,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.progress.loading = true;
    return (environment.mocks
      ? of(getMock(Me)).pipe(delay(MOCKS_DELAY))
      : this.getMeGQL.fetch()
        .pipe(catchGQLErrors(), map(({data: {me}}) => deserialize(me, Me))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.loading = false))
      .subscribe(me => this.form.patchValue({name: me.name, email: me.name, glToken: me.glToken}),
        err => this.errors = err);
  }

  save() {
    const request = new MeUpdate(this.form.getRawValue());
    this.progress.saving = true;
    return (environment.mocks
      ? of(getMock(Me)).pipe(delay(MOCKS_DELAY))
      : this.editProfileGQL.mutate({input: serialize(request)} as R)
        .pipe(catchGQLErrors(), map(({data: {response: {me}}}) =>
          deserialize(me, Me))))
      .pipe(finalize(() => this.progress.saving = false))
      .subscribe(me => this.saved.emit(me), err => this.errors = err);
  }

}
