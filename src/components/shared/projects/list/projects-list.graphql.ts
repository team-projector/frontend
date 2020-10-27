import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllProjectsGQL extends Query<{ projects }> {
  document = gql`
query ($state: ProjectState, $offset: Int, $first: Int) {
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
