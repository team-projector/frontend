import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TeamWorkBreaksGQL extends Query<{ teams }> {
  document = gql`
    query ($team: ID, $user: ID, $offset: Int, $first: Int) {
      breaks: teamWorkBreaks(team: $team, user: $user, offset: $offset, first: $first) {
        count
        edges {
          node {
            id
            name
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
  `;
}
