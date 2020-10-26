import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TimeExpensesGQL extends Query<{ timeExpenses }> {
  document = gql`
query(
    $team: ID
    $user: ID
    $salary: ID
    $date: Date
    $offset: Int
    $first: Int
    $state: String
) {
    timeExpenses: allSpentTimes(
        team: $team
        user: $user
        salary: $salary
        date: $date
        offset: $offset
        first: $first
        state: $state
        orderBy: "-createdAt"
    ) {
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
