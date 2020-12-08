import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllProjectGroupsGQL extends Query<{ groups }> {
  document = gql`
query ($state: [ProjectState], $offset: Int, $first: Int) {
  groups: allProjectGroups(state: $state, offset: $offset, first: $first) {
    count
    edges {
      node {
        id
        title
        fullTitle
        glAvatar
        glUrl
        metrics {
          budget
          budgetSpent
          budgetRemains
          payroll
          profit
        }
        state
      }
    }
  }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectGroupsSummaryGQL extends Query<{ summary }> {
  document = gql`
{
  summary: projectGroupsSummary {
    count
    archivedCount
    supportingCount
    developingCount
  }
}`;
}
