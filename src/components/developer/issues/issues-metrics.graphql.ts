import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class IssuesMetricsGQL extends Query<{userProgressMetrics}> {
  document = gql`
    query UserProgressMetrics($user: ID!, $start: Date!, $end: Date!, $group: String!) {
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
export class IssuesSummaryGQL extends Query<{issuesSummary}> {
  document = gql`
    query IssuesSummary($user: ID, $dueDate: Date, $state: String) {
      issuesSummary(user: $user, dueDate: $dueDate, state: $state) {
        openedCount
        problemsCount
        timeSpent
      }
    }`;
}
