import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class FirstSummaryGQL extends Query<{ summary }> {
  document = gql`
    query IssuesSummary($team: ID, $user: ID, $dueDate: Date) {
      summary: issuesSummary(team: $team, user: $user, dueDate: $dueDate, state: "opened") {
        projects {
          project {
            id
            title
            fullTitle
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
export class SecondSummaryGQL extends Query<{ summary }> {
  document = gql`
    query IssuesSummary($team: ID, $user: ID, $dueDate: Date) {
      summary: issuesSummary(team: $team, user: $user, dueDate: $dueDate) {
        issuesCount
        openedCount
        problemsCount
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class ThirdSummaryGQL extends Query<{ summary }> {
  document = gql`
    query IssuesSummary($team: ID, $user: ID, $dueDate: Date, $state: String, $problems: Boolean) {
      summary: issuesSummary(team: $team, user: $user, dueDate: $dueDate, state: $state, problems: $problems) {
        issuesCount
        timeSpent
      }
    }`;
}
