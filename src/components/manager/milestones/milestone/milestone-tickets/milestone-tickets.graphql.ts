import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllTicketsGQL extends Query<{ allTickets }> {
  document = gql`
    query AllTickets($milestone: ID!, $offset: Int, $first: Int) {
      allTickets(milestone: $milestone, orderBy: "dueDate", offset: $offset, first: $first) {
        count
        edges {
          node {
            id
            type
            title
            startDate
            dueDate
            url
            metrics {
              budgetEstimate
              budgetRemains
              payroll
              profit
              timeEstimate
              timeSpent
              timeRemains
              issuesCount
              issuesOpenedCount
              issuesClosedCount
            }
          }
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class AttachIssueGQL extends Query<{ issue }> {
  document = gql`
    mutation ($id: ID!, $ticket: ID!) {
      updateIssue(id: $id, ticket: $ticket) {
        issue {
          id
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteTicketGQL extends Query<{ issue }> {
  document = gql`
    mutation ($id: ID!) {
      deleteTicket(id: $id) {
        ok
      }
    }`;
}
