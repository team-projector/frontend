import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GetTicketGQL extends Query<{ ticket }> {
  document = gql`
    query GetTicket($ticket: ID!) {
      ticket(id: $ticket) {
        id
        type
        title
        startDate
        dueDate
        url
        issues {
          count
          edges {
            node {
              title
              id
              dueDate
              closedAt
              labels {
                count
                edges {
                  node {
                    title
                    color
                  }
                }
              }
              project {
                fullTitle
              }
              state
              createdAt
              timeEstimate
              totalTimeSpent
              timeEstimate
              glUrl
              ticket {
                id
                title
                url
              }
              user {
                id
                name
                glAvatar
              }
              metrics {
                remains
                efficiency
                payroll
                paid
              }
            }
          }
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class CreateTicketGQL extends Mutation<{ ticket }> {
  document = gql`
    mutation ($input: CreateTicketMutationInput!) {
      createTicket(input: $input) {
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
    mutation ($input: UpdateTicketMutationInput!) {
      updateTicket(input: $input) {
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
