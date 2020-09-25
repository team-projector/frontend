import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllWorkBreaks extends Query<{ breaks }> {
  document = gql`
query($team: ID, $user: ID, $offset: Int, $first: Int) {
    breaks: allWorkBreaks(
        team: $team
        user: $user
        offset: $offset
        first: $first
    ) {
        count
        edges {
            node {
                id
                createdAt
                user {
                    id
                    name
                    glAvatar
                    position {
                      title
                    }
                }
                fromDate
                toDate
                comment
                reason
                approveState
                approvedBy {
                    name
                    glAvatar
                    position {
                      title
                    }
                }
                approvedAt
            }
        }
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteWorkBreakGQL extends Query<{ break }> {
  document = gql`
    mutation ($id: ID!) {
      deleteWorkBreak(id: $id) {
        ok
      }
    }`;
}


@Injectable({
  providedIn: 'root'
})
export class ApproveWorkBreakGQL extends Query<{ break }> {
  document = gql`
    mutation ($id: ID!) {
      approveWorkBreak(id: $id) {
        workBreak {
          id
        }
      }
    }`;
}


@Injectable({
  providedIn: 'root'
})
export class DeclineWorkBreakGQL extends Query<{ break }> {
  document = gql`
    mutation ($id: ID!, $declineReason: String!) {
      declineWorkBreak(id: $id, declineReason: $declineReason) {
        workBreak {
          id
        }
      }
    }`;
}


@Injectable({
  providedIn: 'root'
})
export class AllTeamWorkBreaks extends Query<{ breaks }> {
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
    }`;
}
