import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ComponentFactoryResolver, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { field, model } from '@junte/mocker-library';
import { R } from 'apollo-angular/types';
import { isEqual, ModalOptions, ModalService, UI } from 'junte-ui';
import { distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { Issue, IssuesFilter, PagingIssues } from 'src/models/issue';
import { Milestone } from 'src/models/milestone';
import { PagingTickets, Ticket, TicketsFilter, TicketTypes } from 'src/models/ticket';
import { DurationFormat } from 'src/pipes/date';
import { equals } from 'src/utils/equals';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { AllTicketsGQL, AttachIssueGQL, DeleteTicketGQL, MilestoneIssuesSummaryGQL, TicketIssuesGQL } from './milestone.graphql';

@model()
class MilestoneState {

  @field()
  ticket?: string;

  constructor(defs: MilestoneState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  ticketTypes = TicketTypes;

  private _milestone: Milestone;

  ticketControl = new FormControl(null);

  form = this.fb.group({
    ticket: this.ticketControl
  });

  loading = {tickets: false, issues: false};
  tickets: Ticket[] = [];
  issues: Issue[] = [];

  @Input()
  set milestone(milestone: Milestone) {
    if (!isEqual(this._milestone, milestone)) {
      this._milestone = milestone;
      this.loadTickets();
    }
  }

  get milestone() {
    return this._milestone;
  }

  constructor(private milestoneIssuesSummaryGQL: MilestoneIssuesSummaryGQL,
              private allTicketsGQL: AllTicketsGQL,
              private deleteTicketGQL: DeleteTicketGQL,
              private attachIssueGQL: AttachIssueGQL,
              private ticketIssuesGQL: TicketIssuesGQL,
              private cfr: ComponentFactoryResolver,
              private injector: Injector,
              private modal: ModalService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged((a, b) => equals(a, b)))
      .subscribe(({ticket}) => {
        this.issues = [];
        this.loadIssues(ticket);
        const state = new MilestoneState({ticket: ticket || undefined});
        this.router.navigate([serialize(state)],
          {relativeTo: this.route}).then(() => null);
      });

    this.route.data.subscribe(({milestone, ticket}) => {
      this.milestone = milestone;
      this.form.patchValue({ticket: !!ticket ? ticket.id : null});
    });
  }

  private loadTickets() {
    this.loading.tickets = true;
    const filter = new TicketsFilter({milestone: this.milestone.id});
    this.allTicketsGQL.fetch(serialize(filter) as R).pipe(
      map(({data: {allTickets}}) => deserialize(allTickets, PagingTickets)),
      finalize(() => this.loading.tickets = false)
    ).subscribe(tickets => this.tickets = tickets.results);
  }

  private loadIssues(ticket: string) {
    if (!!ticket) {
      this.loading.issues = true;
      const filter = new IssuesFilter({ticket});
      this.ticketIssuesGQL.fetch(serialize(filter) as R)
        .pipe(map(({data: {ticket: {issues}}}) => deserialize(issues, PagingIssues).results),
          finalize(() => this.loading.issues = false))
        .subscribe(issues => this.issues = issues);
    }
  }

  edit(ticket: Ticket = null) {
    const component = this.cfr.resolveComponentFactory(EditTicketComponent).create(this.injector);
    component.instance.milestone = this.milestone.id;
    component.instance.canceled.subscribe(() => this.modal.close());
    component.instance.saved.subscribe(() => {
      this.modal.close();
      this.loadTickets();
      const {ticket: active} = this.form.getRawValue();
      if (!!ticket && ticket.id === active) {
        this.loadIssues(active);
      }
    });
    if (!!ticket) {
      component.instance.id = ticket.id;
    }

    const options = new ModalOptions({
      title: !!ticket ? {text: 'Edit', icon: UI.icons.edit}
        : {text: 'Add', icon: UI.icons.add},
      maxWidth: '400px'
    });

    this.modal.open(component, options);
  }

  delete(id: string) {
    this.deleteTicketGQL.fetch({id})
      .subscribe(() => this.loadTickets());
  }

  toggleIssues(ticket: string) {
    this.ticketControl.setValue(this.ticketControl.value === ticket ? null : ticket);
  }

  predicate(item: CdkDrag<number>) {
    return !!item.data['issue'];
  }

  predicateIssue(item: CdkDrag<number>) {
    return false;
  }

  drop(event: CdkDragDrop<string[]>) {
    const ticket = event.container.element.nativeElement.attributes.getNamedItem('ticket').value;
    this.attachIssueGQL.fetch({
      id: event.item.data['issue'],
      ticket: ticket
    }).subscribe(() => {
      this.loadTickets();
      this.form.patchValue({ticket: ticket});
    });
  }

}
