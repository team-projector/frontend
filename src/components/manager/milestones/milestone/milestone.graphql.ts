import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class MilestoneIssuesSummaryGQL extends Query<{ summary }> {
  document = gql`
    query IssuesSummary($milestone: ID,$ticket: ID, $team: ID, $dueDate: Date) {
      summary: issuesSummary(milestone: $milestone, ticket: $ticket, team: $team, dueDate: $dueDate) {
        teams {
          team {
            id
            title
          }
          issues {
            remains
            percentage
            openedCount
          }
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class AllTicketsGQL extends Query<{ allTickets }> {
  document = gql`
    query AllTickets($milestone: ID!, $offset: Int, $first: Int) {
      allTickets(milestone: $milestone, orderBy: "dueDate,title", offset: $offset, first: $first) {
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
export class TicketIssuesGQL extends Query<{ ticket: { issues } }> {
  document = gql`
    query TicketIssues($ticket: ID!) {
      ticket(id: $ticket) {
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
export class AttachIssueGQL extends Mutation<{ issue }> {
  document = gql`
    mutation ($issue: ID!, $ticket: ID!) {
      updateIssue(id: $issue, ticket: $ticket) {
        issue {
          id
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteTicketGQL extends Mutation<{ issue }> {
  document = gql`
    mutation ($id: ID!) {
      deleteTicket(id: $id) {
        ok
      }
    }`;
}
