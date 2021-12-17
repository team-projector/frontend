import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class DeveloperIssuesCalendarGQL extends Query<{ days }> {
  document = gql`
query ($user: ID!, $start: Date!, $end: Date!) {
  days: workCalendar(user: $user, start: $start, end: $end) {
    date
    metrics {
      timeEstimate
      timeSpent
      plannedWorkHours
      loading
      payroll
      paid
      issuesCount
    }
    issues {
      dueDate
      title
      timeEstimate
      timeSpent
      state
      glUrl
      labels {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
}
`;
}
