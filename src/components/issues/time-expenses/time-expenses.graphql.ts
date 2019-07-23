import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class TimeExpensesGQL extends Query<{ allSpentTimes }> {
  document = gql`
    query TimeExpesnes ($team: ID, $user: ID, $salary: ID, $date: Date, $offset: Int, $first: Int) {
      allSpentTimes(team: $team, user: $user, salary: $salary, date: $date, offset: $offset, first: $first) {
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
