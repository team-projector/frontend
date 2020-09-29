import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class MergeRequestsGQL extends Query<{ mergeRequests }> {
  document = gql`
    query ($team: ID, $user: ID, $project: ID, $state: String, $orderBy: String, $offset: Int, $first: Int) {
      mergeRequests: allMergeRequests(team: $team, user: $user, project: $project, state: $state, orderBy: $orderBy, offset: $offset, first: $first) {
        count
        edges {
          node {
            title
            id
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
            issues {
              count
              edges {
                node {
                  user {
                    name
                    glAvatar
                  }
                }
              }
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
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class MergeRequestSummaryGQL extends Query<{ summary }> {
  document = gql`
    query ($team: ID, $user: ID, $project: ID) {
      summary: mergeRequestsSummary(team: $team, user: $user, project: $project) {
        count
        openedCount
        closedCount
        mergedCount
      }
    }`;
}