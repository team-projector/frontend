import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class BreaksGQL extends Query<{ breaks }> {
  document = gql`
    query TimeExpesnes($team: ID, $user: ID, $offset: Int, $first: Int) {
      breaks: allWorkBreaks(team: $team, user: $user, offset: $offset, first: $first) {
        count
        edges {
          node {
            id
            createdAt
            user {
              name
              glAvatar
            }
            fromDate
            toDate
            comment
            reason
            approveState
            approvedBy {
              name
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
export class DeleteBreakGQL extends Query<{ break }> {
  document = gql`
    mutation ($id: ID!) {
      deleteWorkBreak(id: $id) {
        ok
      }
    }`;
}
