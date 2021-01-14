import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { SpentTimeSort } from 'src/models/enums/time-expenses';

@Injectable({
  providedIn: 'root'
})
export class TimeExpensesGQL extends Query<{ timeExpenses }> {
  document = gql`
query(
    $team: ID
    $user: ID
    $salary: ID
    $offset: Int
    $first: Int
    $state: String
) {
    timeExpenses: allSpentTimes(
        team: $team
        user: $user
        salary: $salary
        offset: $offset
        first: $first
        state: $state
        sort: ${SpentTimeSort.createdAtDesc}
    ) {
        count
        edges {
            node {
                id
                createdAt
                date
                user {
                  name
                  glAvatar
                  position {
                    title
                  }
                }
                owner {
                    __typename
                    title
                    user {
                        id
                        name
                        glAvatar
                    }
                    glUrl
                    project {
                        title
                        group {
                            title
                        }
                    }
                }
                timeSpent
                sum
                salary {
                    id
                    createdAt
                }
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
query($team: ID, $user: ID, $salary: ID, $date: Date) {
    summary: spentTimesSummary(
        team: $team
        user: $user
        salary: $salary
        date: $date
    ) {
        spent
        openedSpent
        closedSpent
    }
}`;
}
