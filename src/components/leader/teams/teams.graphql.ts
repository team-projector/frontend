import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllTeamsGQL extends Query<{allTeams}> {
  document = gql`
    query AllTeams($first: Int) {
      allTeams(first: $first) {
        count
        edges {
          node {
            id
            title
            members (first: 4, roles: "developer") {
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
              issuesCount
              problemsCount
            }
          }
        }
      }
    }`;
}
