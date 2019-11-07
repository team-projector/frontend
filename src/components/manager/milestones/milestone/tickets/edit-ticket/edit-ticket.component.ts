import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { UI } from 'junte-ui';
import { finalize } from 'rxjs/operators';
import { serialize } from 'serialize-ts/dist';
import {
  CreateTicketGQL,
  EditTicketGQL
} from 'src/components/manager/milestones/milestone/tickets/edit-ticket/edit-ticket.graphql';
import { Ticket, TicketTypes, TicketUpdate } from 'src/models/ticket';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  private _ticket: Ticket;
  ui = UI;
  milestoneTicketTypes = TicketTypes;
  saving = false;

  form = this.fb.group({
    id: [null],
    milestone: [null],
    type: [null, Validators.required],
    title: [null, Validators.required],
    startDate: [new Date(), Validators.required],
    dueDate: [new Date(), Validators.required],
    url: [null]
  });

  @Input() set milestone(milestone: string) {
    this.form.get('milestone').setValue(milestone);
  }

  @Input() set ticket(ticket: Ticket) {
    if (!!ticket) {
      this._ticket = ticket;

      this.form.patchValue({
        id: ticket.id,
        type: ticket.type,
        title: ticket.title,
        startDate: ticket.startDate,
        dueDate: ticket.dueDate,
        url: ticket.url,
      });
    }
  }

  get ticket() {
    return this._ticket;
  }

  @Output() saved = new EventEmitter<TicketUpdate>();
  @Output() canceled = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private createTicketGQL: CreateTicketGQL,
              private editTicketGQL: EditTicketGQL) {
  }

  save() {
    this.saving = true;
    const mutation = !!this.ticket ? this.editTicketGQL : this.createTicketGQL;
    mutation.mutate(serialize(new TicketUpdate(this.form.getRawValue())) as R)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => this.saved.emit());
  }
}
