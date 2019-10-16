import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllTicketsGQL extends Query<{ allTickets }> {
  document = gql`
    query AllTickets($milestone: ID!, $orderBy: String, $offset: Int, $first: Int) {
      allTickets(milestone: $milestone, orderBy: $orderBy, offset: $offset, first: $first) {
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
