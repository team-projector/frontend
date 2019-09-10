import { Injectable } from '@angular/core';
import {Mutation, Query} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class SyncMilestoneGQL extends Mutation<{ syncMilestone: { milestone: { id } } }> {
  document = gql`
    mutation SyncMilestone($id: ID) {
      syncMilestone(id: $id) {
        milestone {
          id
        }
      }
    }
  `;
}

@Injectable({
  providedIn: 'root'
})
export class AllMilestonesGQL extends Query<{allMilestones}> {
  document = gql`
    query AllMilestones($orderBy: String, $offset: Int, $first: Int) {
      allMilestones(active: true, orderBy: $orderBy, offset: $offset, first: $first) {
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
