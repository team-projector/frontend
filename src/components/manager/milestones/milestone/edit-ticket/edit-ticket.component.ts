import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { UI } from 'junte-ui';
import { Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssuesGQL } from 'src/components/issues/issues/issues.graphql';
import { IssuesFilter, PagingIssues } from 'src/models/issue';
import { Issue, Ticket, TicketTypes, TicketUpdate } from 'src/models/ticket';
import { CreateTicketGQL, EditTicketGQL, GetTicketGQL } from './edit-ticket.graphql';

const FOUND_ISSUES_COUNT = 10;

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  ui = UI;
  milestoneTicketTypes = TicketTypes;

  private _ticket: Ticket;
  private _id: string;

  saving = false;
  progress = {loading: false, saving: false};

  form = this.fb.group({
    id: [null],
    type: [TicketTypes.feature, Validators.required],
    title: [null, Validators.required],
    startDate: [new Date(), Validators.required],
    dueDate: [new Date(), Validators.required],
    url: [null],
    issues: [[]]
  });

  set id(id: string) {
    this._id = id;
    this.load();
  }

  get id() {
    return this._id;
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
        issues: ticket.issues.map(i => i.id)
      });
    }
  }

  get ticket() {
    return this._ticket;
  }

  @Output() saved = new EventEmitter<TicketUpdate>();
  @Output() canceled = new EventEmitter<any>();

  findIssues = () => (query: string) => new Observable<Issue[]>(o => {
    const filter = new IssuesFilter({q: query, first: FOUND_ISSUES_COUNT});
    this.issuesGQL.fetch(serialize(filter) as R)
      .pipe(map(({data: {issues}}) => deserialize(issues, PagingIssues)))
      .subscribe(({results: issues}) => {
        console.log(issues);
        o.next(issues);
        o.complete();
      });
  });

  constructor(private fb: FormBuilder,
              private getTicketGQL: GetTicketGQL,
              private createTicketGQL: CreateTicketGQL,
              private editTicketGQL: EditTicketGQL,
              private issuesGQL: IssuesGQL) {
  }

  private load() {
    this.progress.loading = true;
    this.getTicketGQL.fetch({ticket: this.id} as R).pipe(
      map(({data: {ticket}}) => deserialize(ticket, Ticket)),
      finalize(() => this.progress.loading = false)
    ).subscribe(ticket => this.ticket = ticket);
  }

  save() {
    this.saving = true;
    const mutation = !!this.ticket ? this.editTicketGQL : this.createTicketGQL;
    mutation.mutate({input: serialize(new TicketUpdate(this.form.getRawValue())) as R})
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => this.saved.emit());
  }
}
