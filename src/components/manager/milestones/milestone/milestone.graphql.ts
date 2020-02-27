import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class MilestoneIssuesSummaryGQL extends Query<{ summary }> {
  document = gql`
    query ($milestone: ID,$ticket: ID, $team: ID, $dueDate: Date) {
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
    query ($milestone: ID!, $state: String, $offset: Int, $first: Int) {
      allTickets(milestone: $milestone, state: $state, orderBy: "dueDate,startDate,title", offset: $offset, first: $first) {
        count
        edges {
          node {
            id
            type
            state
            title
            role
            startDate
            dueDate
            url
            problems
            metrics {
              budgetEstimate
              budgetRemains
              payroll
              profit
              timeEstimate
              timeSpent
              timeRemains
              openedTimeRemains
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
export class TicketsSummaryGQL extends Query<{ summary }> {
  document = gql`
    query ($milestone: ID!) {
    summary: ticketsSummary(milestone: $milestone) {
      count
      createdCount
      planningCount
      doingCount
      testingCount
      acceptingCount
      doneCount
    }
  }`
}

@Injectable({
  providedIn: 'root'
})
export class TicketIssuesGQL extends Query<{ ticket: { issues } }> {
  document = gql`
    query ($ticket: ID!) {
      ticket(id: $ticket) {
        issues {
          count
          edges {
            node {
              id
              title
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
