import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})

export class TicketsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  // http://localhost:4200/tickets/528
  ngOnInit() {
    this.route.data.subscribe(({ticket}: { ticket: Ticket }) =>
      this.router.navigate(['/manager', 'milestones',
        ticket.milestone.id, {ticket: ticket.id}], {fragment: ticket.id}));
  }

}
