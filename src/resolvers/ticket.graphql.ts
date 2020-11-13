import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TicketGQL extends Query<{ ticket }> {
  document = gql`
query ($ticket: ID!) {
  ticket(id: $ticket) {
    id
    title
    milestone {
      id
    }
  }
}`;
}
