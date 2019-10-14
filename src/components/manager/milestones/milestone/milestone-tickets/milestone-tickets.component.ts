import { Component, ComponentFactoryResolver, forwardRef, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter as filtering, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { EditTicketComponent } from 'src/components/manager/milestones/milestone/milestone-tickets/edit-ticket/edit-ticket.component';
import { AllTicketsGQL } from 'src/components/manager/milestones/milestone/milestone-tickets/milestone-tickets.graphql';
import { Milestone, Ticket, MilestoneTicketsFilter, PagingMilestoneTickets } from 'src/models/milestone';
import { equals } from 'src/utils/equals';

class TicketFilter {
  ticket: Ticket;
}

@Component({
  selector: 'app-milestone-tickets',
  templateUrl: './milestone-tickets.component.html',
  styleUrls: ['./milestone-tickets.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MilestoneTicketsComponent),
      multi: true
    }
  ]
})
export class MilestoneTicketsComponent implements OnInit {

  private milestone$ = new BehaviorSubject<Milestone>(null);
  private orderBy$ = new BehaviorSubject<string>(null);
  private first$ = new BehaviorSubject<number>(null);
  private offset$ = new BehaviorSubject<number>(null);

  ui = UI;
  loading = false;
  tickets: Ticket[] = [];
  ticket: Ticket;

  @ViewChild('content', {static: false})
  content: TemplateRef<any>;

  @ViewChild('footer', {static: false})
  footer: TemplateRef<any>;

  @Input()
  set milestone(milestone: Milestone) {
    if (!equals(this.milestone, milestone)) {
      this.milestone$.next(milestone);
    }
  }

  get milestone() {
    return this.milestone$.getValue();
  }

  set orderBy(orderBy: string) {
    this.orderBy$.next(orderBy);
  }

  get orderBy() {
    return this.orderBy$.getValue();
  }

  set first(first: number) {
    this.first$.next(first);
  }

  get first() {
    return this.first$.getValue();
  }

  set offset(offset: number) {
    this.offset$.next(offset);
  }

  get offset() {
    return this.offset$.getValue();
  }

  constructor(private allTicketsGQL: AllTicketsGQL,
              private cfr: ComponentFactoryResolver,
              private injector: Injector,
              public modalService: ModalService) {
  }

  ngOnInit() {
    combineLatest([this.milestone$, this.orderBy$, this.first$, this.offset$])
      .pipe(filtering(([milestone]) => !!milestone))
      .subscribe(() => this.load());
  }

  private load() {
    this.loading = true;

    const filter = new MilestoneTicketsFilter({
      milestone: this.milestone.id,
      orderBy: this.orderBy,
      first: this.first,
      offset: this.offset
    });

    this.allTicketsGQL.fetch(serialize(filter) as R).pipe(
      map(({data: {allTickets}}) => deserialize(allTickets, PagingMilestoneTickets)),
      finalize(() => this.loading = false)
    ).subscribe(tickets => this.tickets = tickets.results);
  }

  writeValue(value: TicketFilter) {
    if (!!value) {
      this.ticket = value.ticket;
    }
  }

  onChange(value: TicketFilter) {
  }

  onTouched() {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  add() {
    this.open('Add ticket', 'add');
  }

  edit(ticket: Ticket) {
    this.open('Edit ticket', 'edit', ticket);
  }

  open(title: string, icon: string, ticket: Ticket = null) {
    const component = this.cfr.resolveComponentFactory(EditTicketComponent).create(this.injector);
    component.instance.canceled.subscribe(() => this.modalService.close());
    component.instance.saved.subscribe(() => {
      this.modalService.close();
      this.load();
    });
    component.instance.milestone = this.milestone.id;
    component.instance.ticket = ticket;

    const options = new ModalOptions({
      title: {text: title, icon: icon},
      maxWidth: '400px'
    });

    this.modalService.open(component, null, options);
  }
}