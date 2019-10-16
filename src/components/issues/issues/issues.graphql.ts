import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Mutation, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class SyncIssueGQL extends Mutation<{ syncIssue: { issue: { id } } }> {
  document = gql`
    mutation SyncIssue($id: ID) {
      syncIssue(id: $id) {
        issue {
          id
        }
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class IssuesGQL extends Query<{ issues }> {
  document = gql`
    query Issues ($milestone: ID, $ticket: ID, $team: ID, $user: ID, $project: ID, $dueDate: Date, $state: String, $problems: Boolean, $orderBy: String, $offset: Int, $first: Int, $q: String) {
      issues: allIssues(milestone: $milestone, ticket: $ticket, team: $team, user: $user, project: $project, dueDate: $dueDate, state: $state, problems: $problems, orderBy: $orderBy, offset: $offset, first: $first, q: $q) {
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
            }
            user {
              id
              name
              glAvatar
            }
            participants {
              count
              edges {
                node {
                  name
                  glAvatar
                }
              }
            }
            problems
            metrics {
              remains
              efficiency
              payroll
              paid
            }
          }
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class IssuesSummaryGQL extends Query<{ summary }> {
  document = gql`
    query IssuesSummary($milestone: ID,$ticket: ID, $team: ID, $user: ID, $project: ID, $dueDate: Date) {
      summary: issuesSummary(milestone: $milestone, ticket: $ticket, team: $team, user: $user, project: $project, dueDate: $dueDate) {
        count
        closedCount
        openedCount
        problemsCount
      }
    }`;
}
