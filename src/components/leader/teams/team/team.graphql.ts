import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TeamIssuesSummaryGQL extends Query<{issuesSummary}> {
  document = gql`
    query TeamIssuesSummary($team: ID, $user: ID, $dueDate: Date, $state: String) {
      issuesSummary(team: $team, user: $user, dueDate: $dueDate, state: $state) {
        issuesCount
        timeSpent
        problemsCount
      }
    }`;
}
