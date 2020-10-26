import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GitlabStatusGQL extends Query<{gitlabStatus}> {
  document = gql`
    query {
      gitlabStatus {
        services {
          name
          time
        }
        lastSync
        lastIssues {
          id
          title
          dueDate
          labels {
            count
            edges {
              node {
                title
                color
              }
            }
          }
          project {
            title
            group {
              title
            }
          }
          state
          createdAt
          glUrl
          ticket {
            id
            title
            url
          }
          user {
            id
            name
            glAvatar
          }
          closedAt
        }
      }
    }`;
}
