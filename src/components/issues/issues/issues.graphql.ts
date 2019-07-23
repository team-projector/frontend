import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class IssuesGQL extends Query<{allIssues}> {
  document = gql`
    query Issues ($team: ID, $user: ID, $dueDate: Date, $state: String, $problems: Boolean, $orderBy: String, $offset: Int, $first: Int) {
      allIssues(team: $team, user: $user, dueDate: $dueDate, state: $state, problems: $problems, orderBy: $orderBy, offset: $offset, first: $first) {
        count
        edges {
          node {
            title
            id
            dueDate
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
