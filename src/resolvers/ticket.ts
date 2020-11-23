import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from '@junte/serialize-ts';
import { environment } from 'src/environments/environment';
import { Ticket } from 'src/models/ticket';
import { TicketGQL } from 'src/resolvers/ticket.graphql';
import { getMock } from '@junte/mocker';

@Injectable({providedIn: 'root'})
export class TicketResolver implements Resolve<Observable<Ticket>> {

  constructor(private ticketGQL: TicketGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Ticket> {
    const id = route.params['ticket'];
    const action = environment.mocks
      ? of(getMock(Ticket, {id: id}))
      : this.ticketGQL.fetch({ticket: id})
      .pipe(map(({data: {ticket}}) => !!ticket ? deserialize(ticket, Ticket) : null));

    return !!id ? action : of(null);
  }
}
