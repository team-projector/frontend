import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { Ticket } from 'src/models/milestone';
import { TicketGQL } from 'src/resolvers/ticket.graphql';

@Injectable()
export class TicketResolver implements Resolve<Observable<Ticket>> {

  constructor(private ticketGQL: TicketGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Ticket> {
    const id = route.params['ticket'];
    const action = this.ticketGQL.fetch({ticket: id})
      .pipe(map(({data: {ticket}}) => deserialize(ticket, Ticket)));

    return !!id ? action : of(null);
  }
}
