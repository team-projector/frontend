import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { UI } from 'junte-ui';
import { serialize } from 'serialize-ts/dist';
import {
  CreateTicketGQL,
  EditTicketGQL
} from 'src/components/manager/milestones/milestone/milestone-tickets/edit-ticket/edit-ticket.graphql';
import { Ticket, MilestoneTicketTypes, MilestoneTicketUpdate } from 'src/models/milestone';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  ui = UI;
  milestoneTicketTypes = MilestoneTicketTypes;

  form = this.fb.group({
    id: [null],
    milestone: [null],
    type: [null, Validators.required],
    title: [null, Validators.required],
    startDate: [new Date(), Validators.required],
    dueDate: [new Date(), Validators.required],
    url: [null, Validators.required]
  });

  @Input() set milestone(milestone: string) {
    this.form.get('milestone').setValue(milestone);
  }

  @Input() set ticket(ticket: Ticket) {
    if (!!ticket) {
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

  @Output() saved = new EventEmitter<MilestoneTicketUpdate>();
  @Output() canceled = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private createTicketGQL: CreateTicketGQL,
              private editTicketGQL: EditTicketGQL) {
  }

  save() {
    const mutation = !!this.ticket ? this.editTicketGQL : this.createTicketGQL;
    mutation.mutate(serialize(new MilestoneTicketUpdate(this.form.getRawValue())) as R)
      .subscribe(() => this.saved.emit());
  }
}
