import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

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
            title
            owner {
              __typename
              title
              state
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
export class TimeExpensesSummaryGQL extends Query<{ spentTimes }> {
  document = gql`
    query TimeExpensesSummaryType($team: ID, $user: ID, $date: Date) {
      spentTimes: spentTimesSummary(team: $team, user: $user, date: $date) {
        spent
        openedSpent
        closedSpent
      }
    }`;
}
