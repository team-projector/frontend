import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class IssuesSummaryGQL extends Query<{issuesSummary}> {
  document = gql`
    query IssuesSummary($user: ID, $dueDate: Date, $state: String) {
      issuesSummary(user: $user, dueDate: $dueDate, state: $state) {
        issuesCount
        timeSpent
        problemsCount
      }
    }`;
}
