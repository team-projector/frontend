import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TimeExpensesGQL extends Query<{ allSpentTimes }> {
  document = gql`
    query ($team: ID, $user: ID, $salary: ID, $project: ID, $date: Date, $offset: Int, $first: Int, $state: String) {
      allSpentTimes(team: $team, user: $user, salary: $salary, project: $project, date: $date, offset: $offset, first: $first, state: $state) {
        count
        edges {
          node {
            id
            createdAt
            date
            owner {
              __typename
              title
              state
              user {
                id
                name
                glAvatar
              }
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
    query ($team: ID, $user: ID, $date: Date) {
      spentTimes: spentTimesSummary(team: $team, user: $user, date: $date) {
        spent
        openedSpent
        closedSpent
      }
    }`;
}
