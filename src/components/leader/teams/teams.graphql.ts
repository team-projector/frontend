import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllTeamsGQL extends Query<{ teams }> {
  document = gql`
    query ($first: Int, $offset: Int) {
      teams: allTeams(first: $first, offset: $offset) {
        count
        edges {
          node {
            id
            title
            members(first: 4, roles: "DEVELOPER") {
              count
              edges {
                node {
                  user {
                    glAvatar
                  }
                }
              }
            }
            metrics {
              issues {
                count
                openedCount
                openedEstimated
              }
              problemsCount
            }
          }
        }
      }
    }`;
}
