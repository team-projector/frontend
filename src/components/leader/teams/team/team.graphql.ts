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
            glUrl
            group {
              fullTitle
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
export class SecondSummaryGQL extends Query<{ summary }> {
  document = gql`
    query IssuesSummary($team: ID, $user: ID, $project: ID, $dueDate: Date) {
      summary: issuesSummary(team: $team, user: $user, project: $project, dueDate: $dueDate, state: "opened") {
        count
        problemsCount
        timeSpent
      }
    }`;
}
