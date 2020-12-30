import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TeamBreaksGQL extends Query<{ team }> {
  document = gql`
query ($id: ID!) {
  team(id: $id) {
    members {
      count
      edges {
        node {
          id
          user {
            name
            position {
              title
            }
            glAvatar
            workBreaks {
              count
              edges {
                node {
                  id
                  createdAt
                  fromDate
                  toDate
                  comment
                  reason
                  approveState
                  approvedBy {
                    name
                    glAvatar
                  }
                  approvedAt
                }
              }
            }
          }
        }
      }
    }
  }
}`;
}
