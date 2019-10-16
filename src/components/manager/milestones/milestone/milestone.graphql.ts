import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class MilestoneIssuesSummaryGQL extends Query<{ summary }> {
  document = gql`
    query IssuesSummary($milestone: ID,$ticket: ID, $team: ID, $dueDate: Date) {
      summary: issuesSummary(milestone: $milestone, ticket: $ticket, team: $team, dueDate: $dueDate) {
        teams {
          team {
            id
            title
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
