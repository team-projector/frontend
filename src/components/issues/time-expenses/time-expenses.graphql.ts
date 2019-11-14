import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class TimeExpensesGQL extends Query<{ allSpentTimes }> {
  document = gql`
    query TimeExpenses ($team: ID, $user: ID, $salary: ID, $date: Date, $offset: Int, $first: Int, $state: String) {
      allSpentTimes(team: $team, user: $user, salary: $salary, date: $date, offset: $offset, first: $first, state: $state) {
        count
        edges {
          node {
            id
            createdAt
            date
            owner {
              __typename
              title
              labels {
                count
                edges {
                  node {
                    title
                    color
                  }
                }
              }
              glUrl
              project {
                fullTitle
              }
            }
            timeSpent
            sum
          }
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class TimeExpensesSummaryGQL extends Query<{ summary }> {
  document = gql`
    query TimeExpensesSummaryType($team: ID, $user: ID, $dueDate: Date) {
      summary: timeExpensesSummary(team: $team, user: $user, dueDate: $dueDate) {
        count
        openedCount
        closedCount
        mergedCount
      }
    }`;
}
