import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class SyncMilestoneGQL extends Mutation<{ response: { milestone: { id } } }> {
  document = gql`
mutation($id: ID!) {
    response: syncMilestone(id: $id) {
        milestone {
            id
        }
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class MilestonesSummaryGQL extends Query<{ summary }> {
  document = gql`
query {
    summary: milestonesSummary {
        count
        closedCount
        activeCount
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class AllMilestonesGQL extends Query<{ milestones }> {
  document = gql`
query(
    $offset: Int
    $first: Int
    $state: MilestoneState
    $q: String
    $orderBy: [MilestoneSort]
) {
    milestones: allMilestones(
        offset: $offset
        first: $first
        state: $state
        orderBy: $orderBy
        q: $q
    ) {
        count
        edges {
            node {
                id
                title
                owner {
                    glAvatar
                    fullTitle
                    glUrl
                }
                budget
                startDate
                dueDate
                glUrl
                problems
                state
                metrics {
                    budgetSpent
                    budgetRemains
                    payroll
                    profit
                    timeEstimate
                    timeSpent
                    timeRemains
                    issuesCount
                    issuesOpenedCount
                    issuesClosedCount
                }
            }
        }
    }
}`;
}
