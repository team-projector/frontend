import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GitlabStatusGQL extends Query<{gitlabStatus}> {
  document = gql`
    query GitlabStatus {
      gitlabStatus {
        services {
          name
          time
        }
        lastSync
        lastIssues {
          edges {
            node {
              id
              title
              glUrl
              project {
                fullTitle
              }
              user {
                name
              }
            }
          }
        }
      }
    }`;
}
