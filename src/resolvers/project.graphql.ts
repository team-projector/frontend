import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProjectGQL extends Query<{project}> {
  document = gql`
    query ($project: ID!) {
      project (id: $project) {
        id
        title
        fullTitle
        group {
          title
          glAvatar
          fullTitle
        }
      }
    }`;
}
