import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class FirstSummaryGQL extends Query<{ summary }> {
  document = gql`
    query IssuesSummary($team: ID, $user: ID, $dueDate: Date) {
      summary: issuesSummary(team: $team, user: $user, dueDate: $dueDate, state: "OPENED") {
        projects {
          project {
            id
            title
            fullTitle
            glUrl
            milestones(active: true) {
              edges {
                node {
                  title
                  dueDate
                  glUrl
                  problems
                }
              }
            }
            group {
              title
            }
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
export class SecondSummaryGQL extends Query<{ issues, mergeRequests, spentTimes }> {
  document = gql`
    query Summary($team: ID, $user: ID, $project: ID, $dueDate: Date) {
      issues: issuesSummary(team: $team, user: $user, project: $project, dueDate: $dueDate, state: "OPENED") {
        count
        problemsCount
      }
      mergeRequests: mergeRequestsSummary(team: $team, user: $user, project: $project, state: "OPENED") {
        count
      }
      spentTimes: spentTimesSummary(team: $team, user: $user, project: $project, date: $dueDate) {
        spent
        openedSpent
      }
    }`;
}
