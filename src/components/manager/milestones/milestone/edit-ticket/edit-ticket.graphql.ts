import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GetTicketGQL extends Query<{ ticket }> {
  document = gql`
    query($ticket: ID!) {
      ticket(id: $ticket) {
        id
        type
        title
        role
        startDate
        dueDate
        state
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
    mutation($milestone: ID!, $type: String!, $state: String!, $title: String!, $role: String, $startDate: Date!, $dueDate: Date!, $url: String, $issues: [ID]!) {
      createTicket(milestone: $milestone, type: $type, state: $state, title: $title, role: $role, startDate: $startDate, dueDate: $dueDate, url: $url, issues: $issues) {
        ticket {
          milestone {
            id
          }
          type
          title
          role
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
    mutation($id: ID!, $type: String!, $state: String!, $title: String!, $role: String, $startDate: Date!, $dueDate: Date!, $url: String, $issues: [ID]!) {
      updateTicket(id: $id, type: $type, state: $state, title: $title, role: $role, startDate: $startDate, dueDate: $dueDate, url: $url, issues: $issues) {
        ticket {
          id
          type
          state
          title
          role
          startDate
          dueDate
          url
        }
      }
    }`;
}
