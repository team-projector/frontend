import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProjectGQL extends Query<{project}> {
  document = gql`
    query Project($project: ID!) {
      project (id: $project) {
        id
        title
        fullTitle
        group {
          fullTitle
        }
      }
    }`;
}
