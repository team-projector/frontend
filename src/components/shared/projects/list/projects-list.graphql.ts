import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllProjectsGQL extends Query<{ projects }> {
  document = gql`
query ($state: [ProjectState], $offset: Int, $first: Int) {
  projects: allProjects(state: $state, offset: $offset, first: $first) {
    count
    edges {
      node {
        id
        title
        fullTitle
        group {
          title
        }
        glAvatar
        glUrl
        team {
          title
        }
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
export class ProjectsSummaryGQL extends Query<{ summary }> {
  document = gql`
{
  summary: projectsSummary {
    count
    archivedCount
    supportingCount
    developingCount
  }
}`;
}
