import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { UI } from 'junte-ui';
import { finalize } from 'rxjs/operators';
import { serialize } from 'serialize-ts/dist';
import { CreateBreakGQL, EditBreakGQL } from 'src/components/developer/breaks/break-edit/break-create.graphql';
import { MeManager } from 'src/managers/me.manager';
import { Break, BreakReason, BreakUpdate } from 'src/models/break';
import { User } from 'src/models/user';

@Component({
  selector: 'app-break-edit',
  templateUrl: './break-edit.component.html',
  styleUrls: ['./break-edit.component.scss']
})
export class BreakEditComponent {

  private _break: Break;
  ui = UI;
  saving = false;
  user: User;
  reasons = BreakReason;

  form = this.builder.group({
    user: [this.me.user.id],
    comment: [null, Validators.required],
    reason: [null, Validators.required],
    fromDate: [new Date(), Validators.required],
    toDate: [new Date(), Validators.required]
  });

  @Input() set break(workBreak: Break) {
    if (!!workBreak) {
      this._break = workBreak;
      this.form.patchValue({...workBreak, user: this.me.user.id});
    }
  }

  @Output() saved = new EventEmitter<BreakUpdate>();
  @Output() canceled = new EventEmitter<any>();

  constructor(private me: MeManager,
              private builder: FormBuilder,
              private createBreakGQL: CreateBreakGQL,
              private editBreakGQL: EditBreakGQL) {
  }

  save() {
    this.saving = true;
    const mutation = !!this.break ? this.editBreakGQL : this.createBreakGQL;
    mutation.mutate(serialize(new BreakUpdate(this.form.getRawValue())) as R)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => this.saved.emit());
  }

}
