import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UI } from '@junte/ui';
import { of } from 'rxjs';
import { DeclineWorkBreakGQL } from 'src/components/breaks/breaks/breaks.graphql';
import { environment } from 'src/environments/environment';
import { Break, BreakDecline } from 'src/models/break';

@Component({
  selector: 'app-break-decline',
  templateUrl: './break-decline.component.html',
  styleUrls: ['./break-decline.component.scss']
})
export class BreakDeclineComponent {

  private _break: Break;
  ui = UI;
  saving = false;

  form = this.builder.group({
    id: [null],
    declineReason: [null, Validators.required]
  });

  @Input() set break(workBreak: Break) {
    this._break = workBreak;
    this.form.patchValue(this._break);
  }

  get break() {
    return this._break;
  }

  @Output() saved = new EventEmitter<BreakDecline>();
  @Output() canceled = new EventEmitter<any>();

  constructor(private builder: FormBuilder,
              private declineBreakGQL: DeclineWorkBreakGQL) {
  }

  decline() {
    this.saving = true;
    (environment.mocks ? of(null)
      : this.declineBreakGQL.fetch(this.form.getRawValue()))
      .subscribe(() => this.saved.emit());

  }

}
