import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketGQL extends Mutation<{ ticket }> {
  document = gql`
    mutation ($milestone: ID!, $type: String!, $title: String!, $startDate: Date!, $dueDate: Date!, $url: String) {
      createTicket(milestone: $milestone, type: $type, title: $title, startDate: $startDate, dueDate: $dueDate, url: $url) {
        ticket {
          milestone {
            id
          }
          type
          title
          startDate
          dueDate
          url
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class EditTicketGQL extends Mutation<{ ticket }> {
  document = gql`
    mutation ($id: ID!, $type: String!, $title: String!, $startDate: Date!, $dueDate: Date!, $url: String) {
      updateTicket(id: $id, type: $type, title: $title, startDate: $startDate, dueDate: $dueDate, url: $url) {
        ticket {
          id
          type
          title
          startDate
          dueDate
          url
        }
      }
    }`;
}
