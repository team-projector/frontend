import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class IssuesMetricsGQL extends Query<{ userProgressMetrics }> {
  document = gql`
    query ($user: ID!, $start: Date!, $end: Date!, $group: String!) {
      userProgressMetrics(user: $user, start: $start, end: $end, group: $group) {
        start
        end
        timeEstimate
        timeSpent
        timeRemains
        plannedWorkHours
        loading
        payroll
        paid
        issuesCount
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class IssuesSummaryGQL extends Query<{ issues, mergeRequests, spentTimes }> {
  document = gql`
    query ($user: ID, $dueDate: Date) {
      issues: issuesSummary(user: $user, dueDate: $dueDate, state: "OPENED") {
        count
        problemsCount,
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
      mergeRequests: mergeRequestsSummary(user: $user, state: "OPENED") {
        count
      }
      spentTimes: spentTimesSummary(user: $user, date: $dueDate) {
        spent
        openedSpent
      }
    }`;
}
