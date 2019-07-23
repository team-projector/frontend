import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

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
              fullTitle
              glUrl
            }
            budget
            startDate
            dueDate
            glUrl
            metrics {
              customerPayroll
              payroll
              budgetRemains
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
